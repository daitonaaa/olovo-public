import { Button, Typography } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { Modal } from '../../modal';
import { TextField } from '../../fields/text-field';
import { usePages } from '../../../http/query-hooks';
import { BoxLinkWrapper } from '../styled';

interface Values {
  name: string;
  url: string;
}

interface IMenuItemModalProps {
  isShown: boolean;
  onClose(): void;
  onSubmit(values: Values): void;
  initialValues?: Values;
}

const INITIAL_VALUES = {
  name: '',
  url: '',
};

export const MenuItemModal: React.FC<IMenuItemModalProps> = ({ initialValues, isShown, onClose, onSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: initialValues || INITIAL_VALUES,
    onSubmit: async (values, { resetForm }) => {
      if (!values.name) return;

      onSubmit(values);
      resetForm();
      onClose();
    },
  });

  const { data: pages } = usePages();

  const [showUrls, setShowUrls] = useState(false);

  return (
    <Modal show={isShown} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Typography>Добавить элемент</Typography>
          <TextField
            fullWidth
            type="text"
            label="Название"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              label="Ссылка"
              name="url"
              onFocus={() => setShowUrls(true)}
              onBlur={() => {
                setTimeout(() => setShowUrls(false), 200); // setTimeout нужен, чтобы выбрать список урлов закрывался после клика на урл
              }}
              onChange={formik.handleChange}
              value={formik.values.url}
            />
            {showUrls && (
              <BoxLinkWrapper onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}>
                {pages?.map(({ url, id }) => {
                  return (
                    <Typography
                      variant="caption"
                      key={id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        formik.setFieldValue('url', url);
                        setShowUrls(false);
                      }}
                    >
                      {url}
                    </Typography>
                  );
                })}
              </BoxLinkWrapper>
            )}
          </div>

          <Button color="primary" variant="contained" type="submit" size="large">
            Сохранить
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
