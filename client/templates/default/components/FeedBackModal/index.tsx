import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { createText } from '@/core/admin/http';
import { EMAIL_REGEX, PHONE_REGEXP } from '@/core/shared/constants';
import {
  Form,
  ModalTitle,
  ButtonBlock,
  Text,
} from '@/currentTemplate/components/FeedBackModal/styled';
import React from 'react';
import { useFormik } from 'formik';
import { Modal } from '../Modal';
import { Inputbox } from '../Inputbox';
import { ArrowButton } from '../ArrowButton';
import { InputTextArea } from '../InputTextArea';

interface OrderCallModalProps {
  isShown: boolean;
  hide(): void;
  title?: string;
}

export const FeedBackModal: React.FC<OrderCallModalProps> = ({
  isShown,
  hide,
  title = 'Задать вопрос',
}) => {
  const formik = useFormik({
    initialValues: {
      headerModalName: '',
      headerModalEmail: '',
      headerModalPhone: '',
      headerModalText: '',
    },
    validationSchema: Yup.object({
      headerModalName: Yup.string().required(),
      headerModalEmail: Yup.string().matches(EMAIL_REGEX).required(),
      headerModalPhone: Yup.string().matches(PHONE_REGEXP).required(),
      headerModalText: Yup.string().required(),
    }),
    onSubmit: async function (values, { resetForm }) {
      try {
        const obj = {
          name: values.headerModalName,
          email: values.headerModalEmail,
          phone: values.headerModalPhone,
          text: values.headerModalText,
        };

        await createText(obj);
        hide();
        resetForm();
        alert('данные успешно отправлены');
      } catch (e) {
        alert('ошибка при отправке данных');
      }
    },
  });

  return (
    <Modal isShown={isShown} hide={hide} title={title}>
      <ModalTitle>
        Вы можете задать ваш вопрос по наличию, сроку изготовления, характеристикам, размерам и
        доставке груза.
      </ModalTitle>
      <Form onSubmit={formik.handleSubmit}>
        <Inputbox
          type={'text'}
          label={'Ваше ФИО или компания'}
          name={'headerModalName'}
          invalid={formik.touched.headerModalName && formik.errors.headerModalName ? true : false}
          onChange={formik.handleChange}
          error={'Обязательное поле'}
          value={formik.values.headerModalName}
        />

        <Inputbox
          type={'text'}
          label={'E-mail для ответа'}
          name={'headerModalEmail'}
          invalid={formik.touched.headerModalEmail && formik.errors.headerModalEmail ? true : false}
          onChange={formik.handleChange}
          error={'Обязательное поле'}
          value={formik.values.headerModalEmail}
        />
        <InputMask
          mask="+7(999) 999-99-99"
          value={formik.values.headerModalPhone}
          onChange={formik.handleChange}
        >
          {(inputProps) => (
            <Inputbox
              type={'text'}
              label={'Телефон'}
              name={'headerModalPhone'}
              invalid={formik.touched.headerModalPhone && formik.errors.headerModalPhone}
              onChange={formik.handleChange}
              error={'Введите корректный номер'}
              value={formik.values.headerModalPhone}
              {...inputProps}
            />
          )}
        </InputMask>

        <InputTextArea
          type={'text'}
          label={'Ваш вопрос'}
          name={'headerModalText'}
          invalid={formik.touched.headerModalText && formik.errors.headerModalText ? true : false}
          onChange={formik.handleChange}
          error={'Обязательное поле'}
          value={formik.values.headerModalText}
        />
        <ButtonBlock>
          <Text>Нажимая на кнопку, вы принимаете условия обработки персональных данных</Text>
          <ArrowButton title="Отправить" onClick={formik.handleSubmit} />
        </ButtonBlock>
      </Form>
    </Modal>
  );
};
