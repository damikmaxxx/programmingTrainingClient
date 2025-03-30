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
  },

  // Получение информации о стилях пользователя
  getUserStyles: async () => {
    try {
      const { data } = await $authHost.get("/userstyle/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении стилей пользователя:", error.response?.data || error.message);
    }
  },

  // Добавление нового стиля (покупка)
  addUserStyle: async (styleData) => {
    try {
      const { data } = await $authHost.post("/userstyle/", styleData);
      return data;
    } catch (error) {
      console.error("Ошибка при добавлении стиля:", error.response?.data || error.message);
    }
  },

  // Обновление стиля профиля или ника
  updateUserStyle: async (styleId) => {
    try {
      const { data } = await $authHost.put(`/userstyle/${styleId}/`);
      return data;
    } catch (error) {
      console.error("Ошибка при обновлении стиля:", error.response?.data || error.message);
    }
  }
};

export default userAPI;
