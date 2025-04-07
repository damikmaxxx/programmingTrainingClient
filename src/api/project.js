import { $authHost } from "./index"; // Используем авторизованный хост

const projectAPI = {
  // Получение списка всех проектов
  getProjects: async () => {
    try {
      const { data } = await $authHost.get("/projects/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении списка проектов:", error.response?.data || error.message);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  },

  // Получение списка временных проектов
  getTemporaryProjects: async () => {
    try {
      const { data } = await $authHost.get("/temporary-projects/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении временных проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Получение списка начатых проектов пользователя (существующий метод)
  getStartedProjects: async () => {
    try {
      const { data } = await $authHost.get("/started-projects/");
      return data; // [{ id, name, description, experience, difficulty, coins }]
    } catch (error) {
      console.error("Ошибка при получении начатых проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Получение списка завершенных проектов пользователя (существующий метод)
  getFinishedProjects: async () => {
    try {
      const { data } = await $authHost.get("/finished-projects/");
      return data; // [{ id, name, description, experience, difficulty, coins }]
    } catch (error) {
      console.error("Ошибка при получении завершенных проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  
};

export default projectAPI;