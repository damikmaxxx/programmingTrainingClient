import { useState, useEffect } from 'react';
import { userAPI } from '../api/api.js'; // Импортируем API для получения стилей
import { ALL_STYLES } from '../data/ALL_STYLES.js';

const useUserStyles = (userProfileStyle, userNicknameStyle) => {
  const [profileStylesOptions, setProfileStylesOptions] = useState([]);
  const [nicknameStylesOptions, setNicknameStylesOptions] = useState([]);
  const [defaultProfileStyle, setDefaultProfileStyle] = useState(
    userProfileStyle ? { value: userProfileStyle, label: userProfileStyle } : { value: "0", label: "Без стиля" }
  );
  const [defaultNicknameStyle, setDefaultNicknameStyle] = useState(
    userNicknameStyle ? { value: userNicknameStyle, label: userNicknameStyle } : { value: "0", label: "Без стиля" }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userStyles = await userAPI.getUserStyles();
        if (userStyles) {
          // Фильтруем стили по категориям
          console.log(userStyles);

          const profileStyles = userStyles
            .filter(style => style.category === 'background_profile')
            .map(style => ({
              value: style.style_id,
              label: ALL_STYLES.find(s => s.id === style.style_id)?.name,
            }));
          const nicknameStyles = userStyles
            .filter(style => style.category === 'nickname')
            .map(style => ({
              value: style.style_id,
              label: ALL_STYLES.find(s => s.id === style.style_id)?.name,
            }));
          console.log(profileStyles, nicknameStyles);
          // Добавляем опцию "Без стиля" в начало
          const noStyleOption = { value: userStyles.find(style => style.is_active === true).style_id, label: "Без стиля" };
          const updatedProfileStyles = [noStyleOption, ...profileStyles];
          const updatedNicknameStyles = [noStyleOption, ...nicknameStyles];
          console.log(noStyleOption);
          // Находим активные стили как объекты { value, labe l }
          const activeProfile = userStyles.find(style => style.category === 'background_profile' && style.is_active);
          const activeNickname = userStyles.find(style => style.category === 'nickname' && style.is_active);

          const activeProfileOption = activeProfile
            ? { value: activeProfile.style, label: activeProfile.style }
            : noStyleOption;
          const activeNicknameOption = activeNickname
            ? { value: activeNickname.style, label: activeNickname.style }
            : noStyleOption;

          setProfileStylesOptions(updatedProfileStyles);
          setNicknameStylesOptions(updatedNicknameStyles);
          setDefaultProfileStyle(activeProfileOption);
          setDefaultNicknameStyle(activeNicknameOption);
        }
      } catch (error) {
        console.error('Ошибка при получении стилей:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userProfileStyle, userNicknameStyle]);

  return {
    profileStylesOptions,
    nicknameStylesOptions,
    defaultProfileStyle,
    defaultNicknameStyle,
    loading,
  };
};

export default useUserStyles;