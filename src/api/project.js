import { $authHost } from "./index"; // Используем авторизованный хост

const projectAPI = {
  // Получение списка всех проектов
  getProjects: async () => {
    try {
      const { data } = await $authHost.get("/projects/");
      return data;
    } catch (error) {
      console.error("Ошибка при получении списка проектов:", error.response?.data || error.message);
      throw error;
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

  // Получение списка начатых проектов пользователя
  getStartedProjects: async () => {
    try {
      const { data } = await $authHost.get("/started-projects/");
      return data; // [{ id, name, description, experience, difficulty, coins }]
    } catch (error) {
      console.error("Ошибка при получении начатых проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Получение списка завершенных проектов пользователя
  getFinishedProjects: async () => {
    try {
      const { data } = await $authHost.get("/finished-projects/");
      return data; // [{ id, name, description, experience, difficulty, coins }]
    } catch (error) {
      console.error("Ошибка при получении завершенных проектов:", error.response?.data || error.message);
      throw error;
    }
  },

  // Получение опубликованных кодов и комментариев к проекту
  getProjectComments: async (projectId) => {
    try {
      const { data } = await $authHost.get(`/comment/${projectId}/`);
      return data; // [{ user, project, user_project, code, earned_stars, comments: [{ user, text }] }]
    } catch (error) {
      console.error("Ошибка при получении комментариев к проекту:", error.response?.data || error.message);
      throw error;
    }
  },

  // Установка лайка на проект пользователя
  setLike: async (userProjectId) => {
    try {
      const { data } = await $authHost.post("/set-like/", { user_project_id: userProjectId });
      return data; // { message, data: { user, project, earned_stars, liker } }
    } catch (error) {
      console.error("Ошибка при установке лайка:", error.response?.data || error.message);
      throw error;
    }
  },

  // Добавление комментария под код проекта
  writeComment: async (userProjectId, text) => {
    try {
      const { data } = await $authHost.post("/write-comment/", {
        user_project: userProjectId,
        text,
      });
      return data; // { user, user_project, text }
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default projectAPI;