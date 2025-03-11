// auth.js

import { $authHost, $host, setTokens } from "./index";

const authAPI = {
  login: async ({ email, password }, callback) => {
    try {
      console.log(email, password);
      const { data } = await $host.post("/token/", { email, password });
      setTokens({ access: data.access, refresh: data.refresh });

      if (callback) {
        callback(data); // Вызываем колбэк, передавая полученные данные
      }

      return data;
    } catch (error) {
      console.error(
        "Ошибка авторизации:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Ошибка авторизации");
    }
  },

  register: async ({ email, password, username }, callback) => {
    try {
      const { data } = await $host.post("/register/", {
        email,
        password,
        username,
      });
      setTokens({ access: data.access, refresh: data.refresh });

      if (callback) {
        callback(data); // Вызываем колбэк, передавая полученные данные
      }
      return data;
    } catch (error) {
      console.error(
        "Ошибка регистрации:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Ошибка регистрации");
    }
  },

  updateAccessToken: async (callback) => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const { data } = await $host.post("/token/refresh/", {
        refresh: refreshToken,
      });
      setTokens({ access: data.access });
      callback(true);
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Refresh token истёк. Необходима повторная авторизация.");

        // Удаляем токены из localStorage
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        callback(false);
      } else {
        console.error(
          "Ошибка при обновлении токена:",
          error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || "Ошибка авторизации");
      }
    }
  },

  check: async (callback) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const { data } = await $host.post("/token/verify/", {
        token: accessToken,
      });

      console.log(data, accessToken);
      callback(true);
    } catch (error) {
      const errorCode = error.response?.data?.code;
      if (errorCode === "token_not_valid") {
        await authAPI.updateAccessToken(callback);
        console.log("asdasd");
      } else {
        console.error("Ошибка авторизации:", errorCode);
      }
    }
  },
  // Новый метод для получения минимальной информации о пользователе
  getUserMinInfo: async () => {
    try {
      // Отправляем GET запрос с токеном в заголовках
      const { data } = await $authHost.get("/usermininfo/");
      return data; // Возвращаем полученные данные

    } catch (error) {
      console.error(
        "Ошибка получения данных после регистрации:",
        error.response?.data?.code
      );
    }
  },
};

export default authAPI;
