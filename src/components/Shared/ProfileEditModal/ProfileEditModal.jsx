import React, { useState, useEffect,useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../../UI/Modal/Modal'; // Подключаем модалку
import Select from '../../UI/Select/Select'; // Подключаем Select для выбора стилей
import styles from './ProfileEditModal.module.css';
import {userAPI} from '../../../api/api';  // Подключаем API для получения стилей пользователя
import Loader from '../../UI/Loader/Loader';

const ProfileEditModal = ({ showModal, closeModal, handleConfirm, user = {} }) => {
  const [avatar, setAvatar] = useState(null);
  const [stylesOptions, setStylesOptions] = useState([]); // Состояние для стилей
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const formikRef = useRef(null); // Создаём реф для Formik
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userStyles = await userAPI.getUserStyles();  // Получаем стили пользователя
        console.log(userStyles)
        if (userStyles) {
          const formattedStyles = userStyles.map(style => ({
            value: style.style, 
            label: style.style
          }));
          setStylesOptions(formattedStyles);
        }
      } catch (error) {
        console.error('Ошибка при получении стилей:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const formikConfirm = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };
  // Валидация формы
  const ProfileSchema = Yup.object().shape({
    description: Yup.string().max(300, 'Максимум 300 символов'),
  });

  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      title="Редактирование профиля"
      confirmText="Сохранить"
      exitText="Отменить"
      onConfirm={formikConfirm}
    >
      {loading ? (
        <Loader fullPage={false}/>  // Показываем "Загрузка", пока стили не подгрузятся
      ) : (
        <Formik
        innerRef={formikRef}
          initialValues={{
            nickname: user.name || '',
            description: user.description || '',
            profileStyle: user.profileStyle || (stylesOptions.length ? stylesOptions[0].value : ''),
            nicknameStyle: user.nicknameStyle || (stylesOptions.length ? stylesOptions[0].value : ''),
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values) => {
            console.log({values, avatar})
            handleConfirm({values, avatar}); // Передаем значения и аватар
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="avatar" className={styles.label}>
                  Загрузить аватарку
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className={styles.inputField}
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="username" className={styles.label}>
                  Никнейм
                </label>
                <Field
                  type="text"
                  name="nickname"
                  id="nickname"
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="nickname"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="description" className={styles.label}>
                  Описание
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className={styles.textareaField}
                  placeholder="Напишите что-то о себе"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              {/* <div className={styles.fieldGroup}>
                <label className={styles.label}>Стиль профиля</label>
                <Select
                  options={stylesOptions}  // Передаем стили
                  defaultValue={user.profileStyle}
                  onChange={(value) => {
                    // Обработчик изменения для стиля профиля
                  }}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Стиль ника</label>
                <Select
                  options={stylesOptions}  // Передаем стили
                  defaultValue={user.nicknameStyle}
                  onChange={(value) => {
                    // Обработчик изменения для стиля ника
                  }}
                />
              </div> */}
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default ProfileEditModal;
