import { $authHost } from "./index"; // Используем авторизованный хост

const userAPI = {
  // Получение информации о профиле пользователя
  getProfile: async () => {
    try {
      const { data } = await $authHost.get("/profile/");
      return data;
    } catch (error) {
      console.error(
        "Ошибка при получении профиля пользователя:",
        error.response?.data || error.message
      );
    }
  },

  // Обновление информации о профиле пользователя
  updateProfile: async (profileData) => {
    try {
      const { data } = await $authHost.put("/profile/", profileData);
      console.log(data);
      return data;
    } catch (error) {
      console.error(
        "Ошибка при обновлении профиля пользователя:",
        error.response?.data || error.message
      );
    }
  },

  // Получение информации о прогрессе пользователя
  getUserProgress: async () => {
    try {
      const { data } = await $authHost.get("/user-graph/");
      return data;
    } catch (error) {
      console.error(
        "Ошибка при получении информации о прогрессе пользователя:",
        error.response?.data || error.message
      );
    }
  },
  // Получение списка навыков пользователя (GET /user-skills/)
  getUserSkills: async () => {
    try {
      const { data } = await $authHost.get("/user-skills/");
      return data; // Возвращает массив навыков [{ user, language, experience }, ...]
    } catch (error) {
      console.error(
        "Ошибка при получении навыков пользователя:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Получение информации о стилях пользователя
  getUserStyles: async () => {
    try {
      const { data } = await $authHost.get("/userstyle/");
      console.log(data);
      return data;
    } catch (error) {
      console.error(
        "Ошибка при получении стилей пользователя:",
        error.response?.data || error.message
      );
    }
  },

  // Добавление нового стиля (покупка)
  addUserStyle: async (styleData) => {
    try {
      const { data } = await $authHost.post("/userstyle/", styleData);
      return data;
    } catch (error) {
      console.error(
        "Ошибка при добавлении стиля:",
        error.response?.data || error.message
      );
    }
  },

  // Обновление стиля профиля или ника
  updateUserStyle: async (styleId) => {
    try {
      const { data } = await $authHost.put(`/userstyle/${styleId}/`);
      return data;
    } catch (error) {
      console.error(
        "Ошибка при обновлении стиля:",
        error.response?.data || error.message
      );
    }
  },
  // 2.1 GET /user-projects/ - Получение списка всех пользовательских проектов
  getUserProjects: async () => {
    try {
      const { data } = await $authHost.get("/user-projects/");
      return data; // Список проектов пользователя
    } catch (error) {
      console.error(
        "Ошибка при получении пользовательских проектов:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // // 2.1 PUT /user-projects/{id}/ - Обновление пользовательского проекта
  // updateUserProject: async (id, projectData) => {
  //   try {
  //     const { data } = await $authHost.put(`/user-projects/${id}/`, projectData);
  //     return data; // Обновлённый проект
  //   } catch (error) {
  //     console.error("Ошибка при обновлении пользовательского проекта:", error.response?.data || error.message);
  //     throw error;
  //   }
  // },

  // 2.2 GET /user-projects/{id}/ - Получение пользовательского проекта по ID
  getUserProjectById: async (id) => {
    console.log(id);
    try {
      const { data } = await $authHost.post(
        `/user-projects/get_user_project/`,
        { project: id }
      );
      console.log(data);
      return data; // { project_id, project_name, code, is_completed, is_published, earned_stars, language, finished_date }
    } catch (error) {
      console.error(
        `Ошибка при получении проекта с ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 2.2 PUT /user-projects/{id}/ - Обновление пользовательского проекта по ID
  updateUserProjectById: async (id, projectData) => {
    try {
      console.log(id, projectData);
      const { data } = await $authHost.put(
        `/user-projects/${id}/`,
        projectData
      );
      console.log(data);
      return data; // Обновлённый проект
    } catch (error) {
      console.error(
        `Ошибка при обновлении проекта с ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 2.2 DELETE /user-projects/{id}/ - Удаление пользовательского проекта по ID
  deleteUserProject: async (id) => {
    try {
      await $authHost.delete(`/user-projects/${id}/`);
      return true; // Успешное удаление (возвращаем true, так как нет данных в ответе)
    } catch (error) {
      console.error(
        `Ошибка при удалении проекта с ID ${id}:`,
        error.response?.data || error.message
      );
      throw error; // Пробрасываем ошибку с деталями, если удаление не удалось
    }
  },

  // 2.3 PUT /user-projects/{id}/end_project/ - Завершение проекта пользователя
  endUserProject: async (id) => {
    try {
      const { data } = await $authHost.put(`/user-projects/${id}/end-project/`);
      return data; // Обновлённый статус проекта или сообщение об ошибке
    } catch (error) {
      console.error(
        `Ошибка при завершении проекта с ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 2.4 POST /user-projects/start_project/ - Начало нового проекта
  startUserProject: async (projectId) => {
    try {
      const { data } = await $authHost.post("/user-projects/start-project/", {
        project_id: projectId,
      });
      return data; // { project_id, project_name, code, is_completed, is_published, earned_stars, language, finished_date }
    } catch (error) {
      console.error(
        "Ошибка при начале нового проекта:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  // 10.1 POST /code-executor/ - Отправка кода на компиляцию
  executeCode: async (code, language, inputData = null, project = null) => {
    try {
      const requestData = {
        code,
        language,
        ...(inputData && { input_data: inputData }), // Добавляем input_data, если указано
        ...(project && { project }), // Добавляем project, если указано
      };
      console.log(requestData);
      const { data } = await $authHost.post("/code-executor/", requestData);
      return data; // Ответ от сервера (например, результат выполнения кода)
    } catch (error) {
      console.error(
        "Ошибка при выполнении кода:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 10.1 POST /code-executor/check-solution/ - Проверка решения
  checkSolution: async (code, language, project) => {
    try {
      const requestData = {
        code,
        language,
        project,
      };
      const { data } = await $authHost.post(
        "/code-executor/check-solution/",
        requestData
      );
      return data; // Ответ от сервера (например, результат проверки: успех/ошибка)
    } catch (error) {
      console.error(
        "Ошибка при проверке решения:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default userAPI;
