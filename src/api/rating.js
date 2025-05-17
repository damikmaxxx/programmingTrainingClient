import { $authHost } from "./index"; // Используем авторизованный хост

const ratingAPI = {
  // Получение рейтинга пользователей по опыту
  getExperienceRanking: async (period, limit) => {
    try {
      const { data } = await $authHost.get(`/experience-ranking/${period}/${limit}/`);
      return data;
    } catch (error) {
      console.error("Ошибка при получении рейтинга по опыту:", error.response?.data || error.message);
    }
  },

  // Получение рейтинга пользователей по звездам
  getStarsRanking: async (period, limit) => {
    try {
      const { data } = await $authHost.get(`/stars-ranking/${period}/${limit}/`);
      return data;
    } catch (error) {
      console.error("Ошибка при получении рейтинга по звездам:", error.response?.data || error.message);
    }
  }
};

export default ratingAPI;