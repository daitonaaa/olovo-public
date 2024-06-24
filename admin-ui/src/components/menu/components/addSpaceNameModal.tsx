import { Button, Typography } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Modal } from '../../modal';
import { TextField } from '../../fields/text-field';

interface Values {
  name: string;
}

interface IAddSpaceNameModalProps {
  isShown: boolean;
  onClose(): void;
  onSubmit(values: Values): void;
}

export const AddSpaceNameModal: React.FC<IAddSpaceNameModalProps> = ({ isShown, onClose, onSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.name) return;

      onSubmit(values);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal show={isShown} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Typography>Добавление секции</Typography>
          <TextField
            fullWidth
            type="text"
            label="Название"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Button color="primary" variant="contained" type="submit" size="large">
            Сохранить
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
