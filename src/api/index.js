import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL   
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Функция для установки токенов в localStorage
const setTokens = ({ refresh, access }) => {
    if (refresh) localStorage.setItem('refresh_token', refresh);
    if (access) localStorage.setItem('access_token', access);
};

// Функция для получения текущего токена
const getCurrentToken = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return { accessToken, refreshToken };
};
// Интерсептор для добавления токенов в заголовки
const authInterceptor = async (config) => {
    const { shortToken, dailyToken } = getCurrentToken();

    // Проверка, существует ли короткий токен
    if (shortToken) {
        config.headers.authorization = `Bearer ${shortToken}`;
        return config;
    }

    // // Если нет короткого токена, но есть дневной, пробуем продлить
    // if (dailyToken) {
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, {
    //             "refresh": dailyToken
    //         });

    //         // Если продление прошло успешно, сохраняем новый короткий токен
    //         if (response.data && response.data.shortToken) {
    //             setTokens(dailyToken, response.data.shortToken);
    //             config.headers.authorization = `Bearer ${response.data.shortToken}`;
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при продлении токена:', error);
    //     }
    // }

    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost,
    setTokens
};
