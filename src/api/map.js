import { $host,$authHost } from "./index";  // Если вы используете общий хост из index.js

const mapAPI = {
  // Функция для получения соединений проектов на карте
  getConnections: async () => {
    try {
      const { data } = await $authHost.get("/map/connection/");
      return data;  // Возвращаем данные о соединениях проектов
    } catch (error) {
      console.error("Ошибка при получении соединений проектов:", error.response?.data || error.message);
    }
  },

  // Функция для получения информации о проектах на карте
  getElements: async () => {
    try {
      const { data } = await $authHost.get("/map/elements/");
      return data;  // Возвращаем информацию о проектах
    } catch (error) {
      console.error("Ошибка при получении информации о проектах:", error.response?.data || error.message);
    }
  },

  // Функция для получения информации о открытых проектах пользователя
  getUserProjectMap: async () => {
    try {
      const { data } = await $authHost.get("/map/user-project-map/");
      console.log(data)
      return data;  // Возвращаем информацию о проектах пользователя
    } catch (error) {
      console.error("Ошибка при получении информации о проектах пользователя:", error.response?.data || error.message);
    }
  }
};

export default mapAPI;
