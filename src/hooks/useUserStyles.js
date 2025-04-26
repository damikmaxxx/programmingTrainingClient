import { useState, useEffect } from 'react';
import { userAPI } from '../api/api.js';
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
          // Опция "Без стиля"
          const noStyleOption = { value: "0", label: "Без стиля" };

          // Фильтруем и мапим стили для профиля
          const profileStyles = userStyles
            .filter(style => style.category === 'background_profile')
            .map(style => ({
              value: style.style_id.toString(),
              label: ALL_STYLES.find(s => s.id === style.style_id)?.name || 'Неизвестный стиль',
            }));

          // Фильтруем и мапим стили для ника
          const nicknameStyles = userStyles
            .filter(style => style.category === 'nickname')
            .map(style => ({
              value: style.style_id.toString(),
              label: ALL_STYLES.find(s => s.id === style.style_id)?.name || 'Неизвестный стиль',
            }));

          // Добавляем "Без стиля" в начало массивов
          const updatedProfileStyles = [noStyleOption, ...profileStyles];
          const updatedNicknameStyles = [noStyleOption, ...nicknameStyles];

          // Находим активный стиль для профиля
          const activeProfile = userStyles.find(
            style => style.category === 'background_profile' && style.is_active
          );
          const activeProfileOption = activeProfile
            ? {
                value: activeProfile.style_id.toString(),
                label: ALL_STYLES.find(s => s.id === activeProfile.style_id)?.name || 'Неизвестный стиль',
              }
            : noStyleOption;

          // Находим активный стиль для ника
          const activeNickname = userStyles.find(
            style => style.category === 'nickname' && style.is_active
          );
          const activeNicknameOption = activeNickname
            ? {
                value: activeNickname.style_id.toString(),
                label: ALL_STYLES.find(s => s.id === activeNickname.style_id)?.name || 'Неизвестный стиль',
              }
            : noStyleOption;

          // Обновляем состояния
          setProfileStylesOptions(updatedProfileStyles);
          setNicknameStylesOptions(updatedNicknameStyles);
          setDefaultProfileStyle(activeProfileOption);
          setDefaultNicknameStyle(activeNicknameOption);
        }
      } catch (error) {
        console.error('Ошибка при получении стилей:', error);
        // Устанавливаем "Без стиля" в случае ошибки
        const noStyleOption = { value: "0", label: "Без стиля" };
        setProfileStylesOptions([noStyleOption]);
        setNicknameStylesOptions([noStyleOption]);
        setDefaultProfileStyle(noStyleOption);
        setDefaultNicknameStyle(noStyleOption);
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