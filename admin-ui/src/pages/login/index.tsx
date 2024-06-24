import { PageLayout } from '../../components/layouts/PageLayout';
import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../components/fields/text-field';
import { Button } from '@material-ui/core';
import cookies from 'js-cookie';
import { COOKIE_JWT_KEY } from '../../http/service';
import { login } from '../../http/endpoints';
import { routes } from '../../routes';
import { BoxWrapper } from '../../components/styled';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const formik = useFormik<FormValues>({
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async values => {
      try {
        const jwt = await login(values.email, values.password);
        cookies.set(COOKIE_JWT_KEY, jwt, { expires: 365, path: '/', samesite: 'Strict' });
        location.href = routes.home;
      } catch (err) {
        console.log(err);
      }
    },
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <PageLayout isNavsHidden title="Авторизация">
      <BoxWrapper>
        <FormikProvider value={formik}>
          <Form>
            <br />
            <TextField fullWidth label="Email" name="email" />
            <br />
            <TextField fullWidth label="Пароль" name="password" />
            <br />
            <Button color="primary" variant="contained" type="submit" size="large">
              Войти
            </Button>
          </Form>
        </FormikProvider>
      </BoxWrapper>
    </PageLayout>
  );
};

export default Login;
