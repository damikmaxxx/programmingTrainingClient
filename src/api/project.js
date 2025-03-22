import { $authHost } from "./index";  // Используем авторизованный хост

const projectAPI = {
  // Функция для получения списка всех проектов
  getProjects: async () => {
    try {
      const { data } = await $authHost.get("/projects/");
      return data;  // Возвращаем список проектов
    } catch (error) {
      console.error("Ошибка при получении списка проектов:", error.response?.data || error.message);
    }
  }
};

export default projectAPI;