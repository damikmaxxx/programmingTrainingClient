import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../../UI/Modal/Modal';
import Select from '../../UI/Select/Select';
import styles from './ProfileEditModal.module.css';
import Loader from '../../UI/Loader/Loader';
import useUserStyles from '../../../hooks/useUserStyles'; // Импортируем новый хук

const ProfileEditModal = ({ showModal, closeModal, handleConfirm, user = {} }) => {
  const [avatar, setAvatar] = useState(null);
  const formikRef = useRef(null);

  // Используем хук для получения стилей и состояний
  const {
    profileStylesOptions,
    nicknameStylesOptions,
    defaultProfileStyle,
    defaultNicknameStyle,
    loading,
  } = useUserStyles(user.profileStyle, user.nicknameStyle);
  console.log(    profileStylesOptions,
    nicknameStylesOptions,
    defaultProfileStyle,
    defaultNicknameStyle,
    loading,)
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const formikConfirm = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  // Валидация формы
  const ProfileSchema = Yup.object().shape({
    description: Yup.string().max(300, 'Максимум 300 символов'),
    nickname: Yup.string().required('Никнейм обязателен'),
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
        <Loader fullPage={false} />
      ) : (
        <Formik
          innerRef={formikRef}
          initialValues={{
            nickname: user.name || '',
            description: user.description || '',
            profileStyle: defaultProfileStyle,
            nicknameStyle: defaultNicknameStyle,
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values) => {
            console.log({ values, avatar });
            handleConfirm({ values, avatar });
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                <label htmlFor="nickname" className={styles.label}>
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

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Стиль профиля</label>
                <Select
                  options={profileStylesOptions}
                  defaultLabel={defaultProfileStyle.label}
                  defaultValue={defaultProfileStyle.value}
                  onChange={(style) => {console.log(style); setFieldValue('profileStyle', {value: style.value, label: style.label})}}
                />
                <ErrorMessage
                  name="profileStyle"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Стиль ника</label>
                <Select
                  options={nicknameStylesOptions}
                  defaultLabel={defaultNicknameStyle.label}
                  defaultValue={defaultNicknameStyle.value}
                  onChange={(style) => setFieldValue('nicknameStyle', {value: style.value, label: style.label})}
                />
                <ErrorMessage
                  name="nicknameStyle"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default ProfileEditModal;