import { $host,setTokens } from "./index";

export const login = async ({email, password},callback) => {
  try {
    console.log(email,password)
    const { data } = await $host.post("/token/", { email, password });

    setTokens({access:data.access, refresh:data.refresh});


    if (callback) {
      callback(data); // Вызываем колбэк, передавая полученные данные
    }

    return data;
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Ошибка авторизации");
  }
};

export const register = async ({ email, password, username },callback) => {
  try {
    const { data } = await $host.post("/register/", { email, password, username });
        // Используем setTokens для сохранения токенов
    setTokens({access:data.access, refresh:data.refresh});

    if (callback) {
      callback(data); // Вызываем колбэк, передавая полученные данные
    }
    return data;
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Ошибка регистрации");
  }
};

export const updateAccessToken = async () => {
  try {
    const shortToken = localStorage.getItem('short_token');
    const { data } = await $host.post("/token/refresh/", { refresh: shortToken });
    setTokens({short:data.access});
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Refresh token истёк. Необходима повторная авторизация.");

      // Удаляем токены из localStorage
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token'); // Если у вас есть дневной токен

    } else {
      // Для других ошибок логируем и выбрасываем исключение
      console.error("Ошибка при обновлении токена:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Ошибка авторизации");
    }
  }
};


export const check = async (email, password) => {
  try {
    const { data } = await $host.post("/login/", { email, password });
    // Используем setTokens для сохранения токенов
    setTokens(data.access, data.refresh);
    return data;
  } catch (error) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Ошибка авторизации");
  }
};