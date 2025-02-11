import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';

// Схема валидации с использованием Yup
const RegistrationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Неверный формат номера')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
  nickname: Yup.string()
    .min(3, 'Минимум 3 символа')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const Registration = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Данные регистрации:', values);
    // Здесь можно выполнить асинхронный запрос на регистрацию пользователя
    setTimeout(() => {
      setSubmitting(false);
      // Можно добавить уведомление об успешной регистрации или перенаправление
    }, 1000);
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          phone: '',
          email: '',
          nickname: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.registrationForm + " dark-primary-color"}>
            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                Номер телефона
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                placeholder="+7XXXXXXXXXX"
                className={styles.inputField}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                className={styles.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="nickname" className={styles.label}>
                Ник
              </label>
              <Field
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Ваш ник"
                className={styles.inputField}
              />
              <ErrorMessage
                name="nickname"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                className={styles.inputField}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Подтверждение пароля
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Повторите пароль"
                className={styles.inputField}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              Зарегистрироваться
            </button>
            <Link to="/login" className={styles.registerLink}>
              Есть аккаунт ? Войти
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
