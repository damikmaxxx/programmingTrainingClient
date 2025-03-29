import { $authHost } from "./index";  // Используем авторизованный хост

const userAPI = {
  // Получение информации о профиле пользователя
  getProfile: async () => {
    try {
      const { data } = await $authHost.get("/profile/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении профиля пользователя:", error.response?.data || error.message);
    }
  },

  // Обновление информации о профиле пользователя
  updateProfile: async (profileData) => {
    try {
      const { data } = await $authHost.put("/profile/", profileData);
      return data;
    } catch (error) {
      console.error("Ошибка при обновлении профиля пользователя:", error.response?.data || error.message);
    }
  },

  // Получение информации о прогрессе пользователя
  getUserProgress: async () => {
    try {
      const { data } = await $authHost.get("/user-graph/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении информации о прогрессе пользователя:", error.response?.data || error.message);
    }
  }
};

export default userAPI;