import { $authHost } from "./index"; // Используем авторизованный хост

const shopAPI = {
  // 14. GET /shop/ - Получение списка всех стилей
  getStyles: async () => {
    try {
      const { data } = await $authHost.get("/shop/");
      return data; // Ожидаем массив объектов [{ name, price_in_coin, price_in_stars, category }]
    } catch (error) {
      console.error("Ошибка при получении списка стилей:", error.response?.data || error.message);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  },

  // 15. GET /shop/id/ - Получение информации о стиле по ID
  getStyleById: async (id) => {
    try {
      const { data } = await $authHost.get(`/shop/${id}/`);
      return data; // Ожидаем объект { name, price_in_coin, price_in_stars, category }
    } catch (error) {
      console.error(`Ошибка при получении стиля с ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // 16. GET /shop/? - Фильтрация стилей с параметрами
  getFilteredStyles: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Добавляем фильтры в query-параметры, если они указаны
      if (filters.price_in_stars__lt) {
        queryParams.append("price_in_stars__lt", filters.price_in_stars__lt);
      }
      if (filters.price_in_stars__gt) {
        queryParams.append("price_in_stars__gt", filters.price_in_stars__gt);
      }
      if (filters.price_in_coin__gt) {
        queryParams.append("price_in_coin__gt", filters.price_in_coin__gt);
      }
      if (filters.price_in_coin__lt) {
        queryParams.append("price_in_coin__lt", filters.price_in_coin__lt);
      }
      if (filters.category) {
        queryParams.append("category", filters.category);
      }

      const { data } = await $authHost.get(`/shop/?${queryParams.toString()}`);
      return data; // Ожидаем массив объектов [{ name, price_in_coin, price_in_stars, category }]
    } catch (error) {
      console.error("Ошибка при получении отфильтрованных стилей:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default shopAPI;