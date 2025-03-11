import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Функция для установки токенов в localStorage
const setTokens = ({ refresh, access }) => {
  if (refresh) localStorage.setItem("refresh_token", refresh);
  if (access) localStorage.setItem("access_token", access);
};

// Функция для получения текущего токена
const getCurrentToken = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return { accessToken, refreshToken };
};
// Интерсептор для добавления токенов в заголовки
const authInterceptor = async (config) => {
  const { accessToken, refreshToken } = getCurrentToken();

  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost, setTokens };
