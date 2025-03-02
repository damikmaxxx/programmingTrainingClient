import React from 'react';
import FireEffect from './effects/FireEffect'; // Пример импорта компонента огня
import SnowEffect from './effects/SnowEffect'; // Пример импорта компонента снега
import LaserEffect from './effects/LaserEffect';
// import RainEffect from './effects/RainEffect'; // Пример импорта компонента дождя
// import { profileThemes } from './data/profileThemes'; // Импорт массива тем

function ProfileEffect({ selectedStyle, children }) {
  // Функция для выбора компонента эффекта
  const renderEffect = (selectedStyle) => {
    switch (selectedStyle) {
      case 'FireStyle':
        return <FireEffect speed={{ x: 0, y: -100 }} life={200}  radius={30} particleCount={500} >{children}</FireEffect>;
      case 'SnowStyle':
        return <SnowEffect>{children}</SnowEffect>;
      case 'LaserStyle':
        return <LaserEffect>{children}</LaserEffect>;
      default:
        return null;
    }
  };

  return (
      renderEffect(selectedStyle)
  );
}

export default ProfileEffect;
