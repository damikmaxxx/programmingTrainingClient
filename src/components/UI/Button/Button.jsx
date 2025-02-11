import React from 'react';
import styles from './Button.module.css'; // Импортируем стили из CSS модуля

const Button = ({ children, onClick, variant = 'default', size = 'medium' }) => {
  // Формируем класс кнопки, используя динамическую строку
  const buttonClass = `${styles.btn} ${styles[variant]} ${styles[size]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
