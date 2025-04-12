import { create } from "zustand";

export const useActiveProjectStore = create((set) => ({
  activeProject: {
    theory: ``,
    description: ``,
  },
  // Добавление проекта в категорию "временные" и сохранение в localStorage
  setActiveProject: (project) =>
    set(() => {
      localStorage.setItem("recent_project_id", JSON.stringify(project.project));
      return {
        activeProject: project, // Обновляем activeProject новым значением
      };
    }),
}));