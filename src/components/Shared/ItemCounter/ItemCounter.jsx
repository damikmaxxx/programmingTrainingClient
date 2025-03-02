import React from 'react';
import { FaStar } from 'react-icons/fa'; // Иконка звезды
import { FaCoins } from 'react-icons/fa'; // Иконка монеты
import styles from './ItemCounter.module.css'; // Стили
import { useUserStore } from '../../../store/store'; // Хук для использования стора

const ItemCounter = ({ type, count }) => {
  const { coins, stars } = useUserStore(); // Данные из стора

  // Функция для рендеринга иконки в зависимости от типа
  const renderIcon = () => {
    switch (type) {
      case 'star':
        return <FaStar className={styles.icon} />;
      case 'coin':
        return <FaCoins className={styles.icon} />;
      case 'exp':
        return  <span className={styles.textIcon}>EXP</span>;
      default:
        return null;
    }
  };

  // Выбираем, что показывать: переданное значение `count` или значение из стора
  const renderCount = () => {
    if (count !== undefined) {
      return count; // Если `count` передан как пропс, используем его
    }
    switch (type) {
      case 'star':
        return stars; // Если `type` - "star", показываем количество звезд из стора
      case 'coin':
        return coins; // Если `type` - "coin", показываем количество монет из стора
      default:
        return 0; // Если тип не задан, возвращаем 0
    }
  };

  return (
    <div className={styles.itemCounter}>
      {renderIcon()} {/* Отображаем иконку */}
      {renderCount()} {/* Отображаем количество */}
    </div>
  );
};

export default ItemCounter;
