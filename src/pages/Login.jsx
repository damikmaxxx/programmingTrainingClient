import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { authAPI } from '../api/api';
import { useUserStore } from '../store/user/userStore';
import { useNotification } from '../components/Shared/NotificationProvider/NotificationProvider';
import { handleServerErrors } from '../utils/handleServerErrors/handleServerErrors';

// Валидация через Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
});

const Login = () => {
  const { setAuth, setUser } = useUserStore();
  const { notify } = useNotification();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { email, password } = values;

    try {
      await authAPI.login({ email, password }, async () => {
        setAuth(true);
        const { username, coins, stars, nickname_id } = await authAPI.getUserMinInfo();
        setUser({ name: username, coins, stars, nicknameStyleId: nickname_id });
        notify('Вход успешен!', 'success');
      });
    } catch (error) {
      handleServerErrors(error, notify, {
        defaultMessage: 'Ошибка при входе. Попробуйте снова.',
        fieldNames: {
          email: 'Email',
          password: 'Пароль',
        },
      });
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={`${styles.loginForm} dark-primary-color`}>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              Войти
            </button>

            <Link to="/registration" className={styles.registerLink}>
              Нет аккаунта? Зарегистрироваться
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;