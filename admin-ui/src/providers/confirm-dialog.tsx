import { AlertDialog } from '../components/alert-dialog';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimateWrapper } from '../components/animate-wrapper';

export interface ConfirmShowProps {
  onApply(): void;
  dialogText?: string | React.ReactNode;
}

export interface ConfirmContextInterface {
  show(confirmShowProps: ConfirmShowProps): void;
}

const Context = createContext<ConfirmContextInterface | undefined>(undefined);

let timeout: any;

export const ConfirmDialogProvider: React.FC = ({ children }) => {
  const [dialogParams, setdialogParams] = useState<ConfirmShowProps | null>(null);

  const [isVisible, setVisibleStatus] = useState(false);

  useEffect(() => {
    if (!isVisible && dialogParams) {
      timeout = setTimeout(() => {
        setdialogParams(null);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible, dialogParams]);

  const handleClose = () => {
    setVisibleStatus(false);
  };

  const handleShow = useCallback((data: ConfirmShowProps) => {
    setdialogParams(data);
    setVisibleStatus(true);
  }, []);

  const handleApply = () => {
    dialogParams?.onApply();
    handleClose();
  };

  const params: ConfirmContextInterface = {
    show: handleShow,
  };

  return (
    <Context.Provider value={params}>
      <AnimateWrapper inStatus={!!dialogParams}>
        <AlertDialog
          onSuccess={handleApply}
          open={isVisible}
          onClose={handleClose}
          dialogText={dialogParams?.dialogText}
        />
      </AnimateWrapper>
      {children}
    </Context.Provider>
  );
};

export const useConfirmDialog = () => useContext(Context) as ConfirmContextInterface;
