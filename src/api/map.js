import { $host, $authHost } from "./index";

const mapAPI = {
  // Функция для получения соединений проектов на карте
  getConnections: async () => {
    try {
      const { data } = await $authHost.get("/map/connection/");
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении соединений проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Функция для получения информации о проектах на карте
  getElements: async () => {
    try {
      const { data } = await $authHost.get("/map/elements/");
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении информации о проектах:", error.response?.data || error.message);
      throw error;
    }
  },

  // Функция для получения информации о открытых проектах пользователя
  getUserProjectMap: async () => {
    try {
      const { data } = await $authHost.get("/map/user-project-map/");
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении информации о проектах пользователя:", error.response?.data || error.message);
      throw error;
    }
  },

  // Функция для получения списка проектов, которых нет на карте (админ)
  getAdminListMapProject: async () => {
    try {
      const { data } = await $authHost.get("/map/admin-list-map-project/");
      console.log(data);
      return data; // [{ id, name }]
    } catch (error) {
      console.error("Ошибка при получении списка незанятых проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Функция для сохранения позиций проектов на карте (админ)
  saveMapPositions: async (projects) => {
    try {
      console.log("projects", projects);
      const { data } = await $authHost.post("/map/admin-create-map/", projects);
      return data; // [{ project_id, prev_project_id }]
    } catch (error) {
      console.error("Ошибка при сохранении позиций на карте:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default mapAPI;