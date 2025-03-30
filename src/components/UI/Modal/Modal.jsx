import React from 'react';
import styles from './Modal.module.css'; // Это будет CSS-модуль для стилизации модалки
import Button from '../Button/Button'; // Импортируем компонент Button

const Modal = ({ show, onClose, title, children, confirmText, exitText, onConfirm }) => {
  if (!show) return null; // Если не нужно показывать модалку, то возвращаем null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
        <div className={styles.footer}>
          {confirmText && (
            <Button variant='small' onClick={onConfirm}>{confirmText}</Button>
          )}
          {exitText && (
            <Button variant='small' onClick={onClose}>{exitText}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
