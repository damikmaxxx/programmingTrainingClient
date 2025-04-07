// hooks/useProjects.js
import { useState, useEffect } from 'react';

const useProjects = (projectAPI, activeTab) => {
  const [isLoading, setIsLoading] = useState(false);
  const [temporaryProjects, setTemporaryProjects] = useState([]);
  const [startedProjects, setStartedProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (activeTab === 'additional') {
          const projects = await projectAPI.getTemporaryProjects();
          setTemporaryProjects(projects);
        } else if (activeTab === 'started') {
          const projects = await projectAPI.getStartedProjects();
          console.log(projects)
          setStartedProjects(projects);
        } else if (activeTab === 'finished') {
          const projects = await projectAPI.getFinishedProjects();
          console.log(projects)
          setCompletedProjects(projects);
        }
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [activeTab, projectAPI]);

  return {
    isLoading,
    temporaryProjects,
    startedProjects,
    completedProjects,
  };
};

export default useProjects;