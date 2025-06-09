import { $authHost } from "./index"; // Используем авторизованный хост
export const STYLE_CATEGORY_NICKNAME = 'nickname';
export const STYLE_CATEGORY_BACKGROUND_PROFILE = 'background_profile';
const userAPI = {
  // Получение информации о профиле пользователя
  getProfile: async (id = null) => {
    try {
      const url = id ? `/profile/${id}/` : '/profile/';
      const { data } = await $authHost.get(url);
      return data;
    } catch (error) {
      return error; 
    }
  },

  // Обновление информации о профиле пользователя
  updateProfile: async (profileData) => {
    try {
      const { data } = await $authHost.put("/profile/", profileData);
      return data;
    } catch (error) {
      console.error(
        "Ошибка при обновлении профиля пользователя:",
        error.response?.data || error.message
      );
    }
  },

  // Получение информации о прогрессе пользователя
  getUserProgress: async (id = null) => {
    try {
      const url = id ? `/user-graph/${id}/` : '/user-graph/';
      const { data } = await $authHost.get(url);
      return data;
    } catch (error) {
      console.error(
        `Ошибка при получении прогресса ${id ? `пользователя с ID ${id}` : 'текущего пользователя'}:`,
        error.response?.data || error.message
      );
      throw error; // Пробрасываем ошибку для обработки
    }
  },

  // Получение списка навыков пользователя
  getUserSkills: async (id = null) => {
    try {
      const url = id ? `/user-skills/${id}/` : '/user-skills/';
      const { data } = await $authHost.get(url);
      return data; // Возвращает массив навыков [{ user, language, experience }, ...]
    } catch (error) {
      console.error(
        `Ошибка при получении навыков ${id ? `пользователя с ID ${id}` : 'текущего пользователя'}:`,
        error.response?.data || error.message
      );
      throw error; // Пробрасываем ошибку для обработки
    }
  },

  // Получение информации о стилях пользователя
  getUserStyles: async () => {
    try {
      const { data } = await $authHost.get("/userstyle/");
      return data;
    } catch (error) {
      console.error(
        "Ошибка при получении стилей пользователя:",
        error.response?.data || error.message
      );
    }
  },

  // Добавление нового стиля (покупка)
  buyUserStyle: async (styleData) => {
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
  updateUserStyle: async (styleId, clearCategory = null) => {
    try {
      // Если styleId = 0 и есть clearCategory, отправляем запрос на деактивацию стиля
      if (styleId === 0 && clearCategory) {
        const { data } = await $authHost.put(`/userstyle/0/`, {
          clear_category: clearCategory, // nickname или background_profile
        });
        return data; // { style: "Gold Shine", is_active: false } или ошибка
      }

      // Обычный запрос на активацию стиля
      const { data } = await $authHost.put(`/userstyle/${styleId}/`);
      return data; // { style: str, is_active: true } или ошибка
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.response?.data || error.message;
      console.error('Ошибка при обновлении стиля:', errorMessage);
      throw new Error(errorMessage); // Бросаем ошибку для обработки в хуке/компоненте
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
    try {
      const { data } = await $authHost.post(
        `/user-projects/get_user_project/`,
        { project: id }
      );
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
      const { data } = await $authHost.put(
        `/user-projects/${id}/`,
        projectData
      );
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
  endUserProject: async (id, projectData) => {
    try {
      const { data } = await $authHost.put(`/user-projects/${id}/end_project/`, projectData);
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
  executeCode: async (user_project, code, language, inputData = null, project = null) => {
    try {
      const requestData = {
        user_project,
        code,
        language,
        ...(inputData && { input_data: inputData }), // Добавляем input_data, если указано
        ...(project && { project }), // Добавляем project, если указано
      };
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
  checkSolution: async (user_project, code, language, project) => {
    try {
      const requestData = {
        user_project,
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
