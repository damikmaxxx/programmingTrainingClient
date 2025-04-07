import { useState, useEffect } from 'react';
import { userAPI } from '../api/api.js'; // Импортируем API для получения стилей

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
          const profileStyles = userStyles
            .filter(style => style.category === 'background_profile')
            .map(style => ({
              value: style.style,
              label: style.style,
            }));
          const nicknameStyles = userStyles
            .filter(style => style.category === 'nickname')
            .map(style => ({
              value: style.style,
              label: style.style,
            }));

          // Добавляем опцию "Без стиля" в начало
          const noStyleOption = { value: "0", label: "Без стиля" };
          const updatedProfileStyles = [noStyleOption, ...profileStyles];
          const updatedNicknameStyles = [noStyleOption, ...nicknameStyles];

          // Находим активные стили как объекты { value, label }
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