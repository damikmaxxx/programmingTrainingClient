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

export const register = async (email, password, name) => {
  console.log(process.env.REACT_APP_API_URL)
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) throw new Error("Ошибка регистрации");
  return await response.json();
};