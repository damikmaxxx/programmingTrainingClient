import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useUserStore } from "./store/store"; // Предполагаемый импорт стора
import Layout from "./components/Layout";
import { authRoutes, publicRoutes, guestRoutes, notFoundRoute, adminRoutes } from "./routes";
import { authAPI } from "./api/api";
import Loader from "./components/UI/Loader/Loader";

function App() {
  const { isAuth, setAuth, setUser, role } = useUserStore(); // Получаем состояние авторизации из стора
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      await authAPI.check(async (auth) => {
        setAuth(auth);
        if (!auth) {
          setIsLoading(false); // Если не авторизован, скрываем лоадер
          return;
        }

        try {
          const { username, coins, stars, nickname_id, photo, is_staff,id } =
            await authAPI.getUserMinInfo();
          setUser({
            id: id,
            name: username,
            coins,
            stars,
            nicknameStyleId: nickname_id,
            photo,
            role: is_staff ? "admin" : "user",
          });
        } catch (error) {
          console.error("Ошибка загрузки данных пользователя:", error);
        } finally {
          setIsLoading(false); // Завершаем загрузку
        }
      });
    }
    fetchData();
  }, []);
  if (isLoading) return <Loader />;
  return (
    <Router>
      <Routes>
        {/* Публичные маршруты — доступны всем (например, главная страница) */}
        {publicRoutes.map(({ path, Component, layoutProps }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout {...layoutProps}>
                <Component />
              </Layout>
            }
          />
        ))}

        {/* Гостевые маршруты — доступны только неавторизованным пользователям (логин, регистрация) */}
        {guestRoutes.map(({ path, Component, layoutProps }) => (
          <Route
            key={path}
            path={path}
            element={
              !isAuth ? (
                <Layout {...layoutProps}>
                  <Component />
                </Layout>
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
        ))}

        {/* Защищённые маршруты — доступны только авторизованным пользователям */}
        {authRoutes.map(({ path, Component, layoutProps }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuth ? (
                <Layout {...layoutProps}>
                  <Component />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}

        {/* Маршрут 404 — доступен всем */}
        {notFoundRoute.map(({ path, Component, layoutProps }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout {...layoutProps}>
                <Component />
              </Layout>
            }
          />
        ))}
        {adminRoutes.map(({ path, Component, layoutProps }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuth && role === "admin" ? (
                <Layout {...layoutProps}>
                  <Component />
                </Layout>
              ) : (
                <Navigate to={isAuth ? "/map" : "/login"} replace />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
