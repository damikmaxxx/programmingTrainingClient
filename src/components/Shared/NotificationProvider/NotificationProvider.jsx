import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Создаём контекст для уведомлений
const NotificationContext = createContext();

// Провайдер для настройки и вызова уведомлений
export const NotificationProvider = ({ children }) => {
  // Функция для вызова уведомления с параметрами
  const notify = (message, type = 'info', options = {}) => {
    const defaultOptions = {
      position: 'top-right', // Выезд с правой стороны
      autoClose: 3000, // Исчезает через 3 секунды
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options, // Перезаписываем пользовательскими опциями
    };

    switch (type) {
      case 'success':
        toast.success(message, defaultOptions);
        break;
      case 'error':
        toast.error(message, defaultOptions);
        break;
      case 'warning':
        toast.warn(message, defaultOptions);
        break;
      case 'info':
      default:
        toast.info(message, defaultOptions);
        break;
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Встроенная тёмная тема
      />
      {children}
    </NotificationContext.Provider>
  );
};

// Хук для доступа к уведомлениям
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};