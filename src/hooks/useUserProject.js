// hooks/useUserProject.js
import { useState, useEffect } from 'react';
import { userAPI } from '../api/api';

const useUserProject = (projectId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProject, setUserProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProject() {
      if (!projectId) return; // Если ID нет, ничего не загружаем

      setIsLoading(true);
      try {
        const data = await userAPI.getUserProjectById(projectId);
        setUserProject(data); // { project_id, project_name, code, is_completed, is_published, earned_stars, language, finished_date }
      } catch (err) {
        setError(err.response?.data || err.message);
        console.error("Ошибка загрузки проекта пользователя:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProject();
  }, [projectId]);

  return { isLoading, userProject, error };
};

export default useUserProject;