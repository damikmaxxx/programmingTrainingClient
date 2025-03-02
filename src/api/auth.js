const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Ошибка авторизации");
  return await response.json();
};

export const register = async ({email, password, username}) => {
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,password,username
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();  // Читаем ошибку от сервера
      console.error("Server Error:", errorData);  // Выводим ошибку в консоль
      throw new Error(`Ошибка регистрации: ${errorData.message || 'Неправильные данные'}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error; // Выбрасываем ошибку дальше, если нужно
  }
};
