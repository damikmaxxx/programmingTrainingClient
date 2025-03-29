import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api/api';
import DefaultProfile from '../components/profileStyles/DefaultPage/DefaultProfile';
import Loader from '../components/UI/Loader/Loader';
import { useUserStore } from '../store/store';

function Profile({ testStyle = false }) {
  console.log(testStyle);

  const { id: paramId } = useParams();
  const { setUser, updateTimeExpDiagram } = useUserStore(); // Обновляем Zustand, но не используем из него данные
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Получаем профиль пользователя
        const fetchedUserData = await userAPI.getProfile();
        console.log(fetchedUserData);
        if (fetchedUserData) {
          setUser(fetchedUserData); // Обновляем Zustand (но не используем)
          setUserData(fetchedUserData); // Обновляем локальный стейт
        }

        // Получаем данные о прогрессе пользователя
        const fetchedProgressData = await userAPI.getUserProgress();
        console.log(fetchedProgressData);
        if (fetchedProgressData) {
          updateTimeExpDiagram(fetchedProgressData); // Сохраняем данные о прогрессе в стейт
          setUserData({ ...fetchedUserData, timeExpDiagram: fetchedProgressData }
          ); // Обновляем локальный стейт
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  const selectedStyleId = testStyle ? paramId : userData?.background_profile;

  return (
    <DefaultProfile
      avatar={userData?.photo || "https://www.gravatar.com/avatar/?d=mp"}
      name={userData?.username}
      coins={userData?.coins}
      stars={userData?.stars}
      exp={userData?.experience}
      description={userData?.description}
      recentProjects={userData?.last_projects}
      skills={userData?.skills}
      timeExpDiagram={userData?.timeExpDiagram}
      selectedStyleId={selectedStyleId}
    />
  );
}

export default Profile;
