import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore,useShopStore } from '../store/store'; // Импортируем useUserStore
import DefaultProfile from '../components/profileStyles/DefaultPage/DefaultProfile';

function Profile({testStyle = false}) {
  console.log(testStyle)
  // Получаем данные пользователя из Zustand store
  const { id, name, coins, stars, exp, profileStyleId,description, recentProjects, skills, timeExpDiagram } = useUserStore();

  const { id: paramId } = useParams(); 
  console.log(paramId)
  // Выбираем стиль для профиля
  const selectedStyleId = testStyle ? paramId : profileStyleId;
  console.log(selectedStyleId)
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
      selectedStyleId={selectedStyleId} // Передаем выбранный стиль
    />
  );
}

export default Profile;
