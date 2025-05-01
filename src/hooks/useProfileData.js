import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api/api';
import { useUserStore } from '../store/store';
import { useNotification } from '../components/Shared/NotificationProvider/NotificationProvider';
import { handleServerErrors } from '../utils/handleServerErrors/handleServerErrors';
import { DEFAULT_USER_IMAGE } from '../utils/consts';
const useProfileData = (testStyle = false) => {
  const { id: paramId } = useParams(); // ID из URL (например, /profile/123)
  const { id: currentUserId, setUser, updateTimeExpDiagram } = useUserStore(); // ID текущего пользователя
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notify } = useNotification();

  // Определяем, свой ли это профиль
  const isOwnProfile = !paramId || paramId === currentUserId;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Получаем профиль пользователя
        const fetchedUserData = await userAPI.getProfile(paramId);
        console.log('Profile data:', fetchedUserData);
        if (fetchedUserData) {
          // Обновляем Zustand только для текущего пользователя
          if (isOwnProfile) {
            setUser(fetchedUserData);
          }
          setUserData(fetchedUserData); // Обновляем локальный стейт
        }

        // Получаем данные о прогрессе пользователя
        const fetchedProgressData = await userAPI.getUserProgress(paramId);
        console.log('Progress data:', fetchedProgressData);
        if (fetchedProgressData) {
          // Обновляем Zustand только для текущего пользователя
          if (isOwnProfile) {
            updateTimeExpDiagram(fetchedProgressData);
          }
          setUserData(prev => ({ ...prev, timeExpDiagram: fetchedProgressData }));
        }

        // Получаем навыки пользователя
        const fetchedSkillsData = await userAPI.getUserSkills(paramId);
        console.log('Skills data:', fetchedSkillsData);
        if (fetchedSkillsData) {
          setUserData(prev => ({ ...prev, skills: fetchedSkillsData }));
        }
        
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError(err);
        handleServerErrors(err.response?.data, notify, {
          defaultMessage: 'Ошибка загрузки профиля. Попробуйте снова.',
          fieldNames: {
            username: 'Имя пользователя',
            photo: 'Аватар',
            detail: 'Ошибка',
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [paramId, currentUserId, setUser, updateTimeExpDiagram, isOwnProfile, notify]);

  const selectedStyleId = testStyle ? paramId : userData?.background_profile;

  return {
    userData: {
      avatar: userData?.photo || {DEFAULT_USER_IMAGE},
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
    isOwnProfile, // Добавляем новый параметр
  };
};

export default useProfileData;