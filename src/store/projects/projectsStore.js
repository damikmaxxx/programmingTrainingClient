import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useProjectsStore = create(devtools((set) => ({
  mapProjects: [],
  temporaryProjects: [],
  startedProjects: [],
  completedProjects: [],
  // Сет функции для обновления "mapProjects"
  setMapProjects: (newProjects) =>
    set({
      mapProjects: newProjects,
    }),

  // Сет функции для обновления "temporaryProjects"
  setTemporaryProjects: (newProjects) =>
    set({
      temporaryProjects: newProjects,
    }),

  // Сет функции для обновления "startedProjects"
  setStartedProjects: (newProjects) =>
    set({
      startedProjects: newProjects,
    }),

  // Сет функции для обновления "completedProjects"
  setCompletedProjects: (newProjects) =>
    set({
      completedProjects: newProjects,
    }),

  // Добавление проекта в категорию "временные"
  addTemporaryProject: (project) =>
    set((state) => ({
      temporaryProjects: [...state.temporaryProjects, project],
    })),

  // Удаление проекта из категории "временные"
  removeTemporaryProject: (projectId) =>
    set((state) => ({
      temporaryProjects: state.temporaryProjects.filter(
        (project) => project.id !== projectId
      ),
    })),

  // Добавление проекта в категорию "начатые"
  addStartedProject: (project) =>
    set((state) => ({
      startedProjects: [...state.startedProjects, project],
    })),

  // Удаление проекта из категории "начатые"
  removeStartedProject: (projectId) =>
    set((state) => ({
      startedProjects: state.startedProjects.filter(
        (project) => project.id !== projectId
      ),
    })),

  // Добавление проекта в категорию "завершенные"
  addCompletedProject: (project) =>
    set((state) => ({
      completedProjects: [...state.completedProjects, project],
    })),

  // Удаление проекта из категории "завершенные"
  removeCompletedProject: (projectId) =>
    set((state) => ({
      completedProjects: state.completedProjects.filter(
        (project) => project.id !== projectId
      ),
    })),
})));
