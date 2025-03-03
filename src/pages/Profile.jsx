import React from 'react';
import { useUserStore,useShopStore } from '../store/store'; // Импортируем useUserStore
import DefaultProfile from '../components/profileStyles/DefaultPage/DefaultProfile';

function Profile({testStyle = false}) {
  console.log(testStyle)
  // Получаем данные пользователя из Zustand store
  const { id, name, coins, stars, exp, profileStyle,description, recentProjects, skills, timeExpDiagram } = useUserStore();
  const {testProfileStyle } = useShopStore();
  console.log(testProfileStyle, profileStyle)
  // Выбираем стиль для профиля
  const selectedStyle = testStyle ? testProfileStyle : profileStyle;

  return (
    <DefaultProfile 
      avatar="https://www.gravatar.com/avatar/?d=mp"
      name={name}
      coins={coins}
      stars={stars}
      exp={exp}
      description={description}
      recentProjects={recentProjects}
      skills={skills}
      timeExpDiagram={timeExpDiagram}
      selectedStyle={selectedStyle} // Передаем выбранный стиль
    />
  );
}

export default Profile;
