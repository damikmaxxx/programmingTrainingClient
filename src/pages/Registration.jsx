import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';
import { authAPI } from '../api/index';

// Схема валидации с использованием Yup
const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
  username: Yup.string()
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
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      const { confirmPassword, ...registrationValues } = values;
      console.log(registrationValues);
      const response = await authAPI.register(registrationValues);
      // console.log('Регистрация прошла успешно:', response);
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={`${styles.registrationForm} dark-primary-color`}>
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
              <label htmlFor="username" className={styles.label}>
                Имя пользователя
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Ваше имя"
                className={styles.inputField}
              />
              <ErrorMessage
                name="username"
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
              Есть аккаунт? Войти
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
