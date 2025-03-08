import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useUserStore } from './store/store'; // Предполагаемый импорт стора
import Layout from './components/Layout';
import { authRoutes, publicRoutes, guestRoutes, notFoundRoute } from './routes';

function App() {
  const { isAuth } = useUserStore(); // Получаем состояние авторизации из стора

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
      </Routes>
    </Router>
  );
}

export default App;
