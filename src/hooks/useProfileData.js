import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api/api';
import { useUserStore } from '../store/store';

const useProfileData = (testStyle = false) => {
  const { id: paramId } = useParams();
  const { setUser, updateTimeExpDiagram } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Получаем профиль пользователя
        const fetchedUserData = await userAPI.getProfile();
        console.log('Profile data:', fetchedUserData);
        if (fetchedUserData) {
          setUser(fetchedUserData); // Обновляем Zustand
          setUserData(fetchedUserData); // Обновляем локальный стейт
        }

        // Получаем данные о прогрессе пользователя
        const fetchedProgressData = await userAPI.getUserProgress();
        console.log('Progress data:', fetchedProgressData);
        if (fetchedProgressData) {
          updateTimeExpDiagram(fetchedProgressData); // Обновляем Zustand
          setUserData(prev => ({ ...prev, timeExpDiagram: fetchedProgressData }));
        }

        // Получаем навыки пользователя
        const fetchedSkillsData = await userAPI.getUserSkills();
        console.log('Skills data:', fetchedSkillsData);
        if (fetchedSkillsData) {
          setUserData(prev => ({ ...prev, skills: fetchedSkillsData }));
        }
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setUser, updateTimeExpDiagram]);

  const selectedStyleId = testStyle ? paramId : userData?.background_profile;

  return {
    userData: {
      avatar: userData?.photo || "https://www.gravatar.com/avatar/?d=mp",
      name: userData?.username,
      coins: userData?.coins,
      stars: userData?.stars,
      exp: userData?.experience,
      description: userData?.description,
      recentProjects: userData?.last_projects,
      skills: userData?.skills,
      timeExpDiagram: userData?.timeExpDiagram,
      selectedStyleId,
    },
    isLoading,
    error,
  };
};

export default useProfileData;