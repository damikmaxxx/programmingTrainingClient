import React from 'react';
import FireEffect from './effects/FireEffect'; // Пример импорта компонента огня
import SnowEffect from './effects/SnowEffect'; // Пример импорта компонента снега
import LaserEffect from './effects/LaserEffect';
// import RainEffect from './effects/RainEffect'; // Пример импорта компонента дождя
// import { profileThemes } from './data/profileThemes'; // Импорт массива тем

function ProfileEffect({ selectedStyleId, children }) {
  console.log(selectedStyleId == 13)
  // Функция для выбора компонента эффекта
  const renderEffect = (selectedStyleId) => {
    switch (Number(selectedStyleId)) {
      case 13:
        return <FireEffect speed={{ x: 0, y: -100 }} life={200}  radius={30} particleCount={500} >{children}</FireEffect>;
      case 14:
        return <SnowEffect>{children}</SnowEffect>;
      case 15:
        return <LaserEffect>{children}</LaserEffect>;
      default:
        return null;
    }
  };

  return (
      renderEffect(selectedStyleId)
  );
}

export default ProfileEffect;
