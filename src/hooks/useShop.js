import { useState, useEffect } from 'react';

const useShop = (shopAPI, sortOrder) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stylesByCategory, setStylesByCategory] = useState({
    nickname: [],
    background_profile: [],
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Используем sortOrder напрямую как ordering
        const filters = sortOrder ? { ordering: sortOrder } : {};
        const data = await shopAPI.getFilteredStyles(filters);
        console.log(data);

        // Разделяем стили по категориям
        const nicknameStyles = data.filter(style => style.category === 'nickname');
        const backgroundStyles = data.filter(style => style.category === 'background_profile');

        setStylesByCategory({
          nickname: nicknameStyles || [],
          background_profile: backgroundStyles || [],
        });
      } catch (error) {
        console.error("Ошибка загрузки стилей магазина:", error);
        setStylesByCategory({
          nickname: [],
          background_profile: [],
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [shopAPI, sortOrder]);

  return {
    isLoading,
    shopStyles: stylesByCategory, // Возвращаем объект с категориями
  };
};

export default useShop;