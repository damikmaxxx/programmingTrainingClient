import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useProjectsStore = create(devtools((set) => ({
  mapProjects: [
    // {
    //   id: 1,
    //   title: "Проверка палиндрома",
    //   description:
    //     "Задание: Напишите функцию, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).",
    //   exp: 50,
    //   money: 75,
    //   lockLevel: 1,
    // },
    // {
    //   id: 2,
    //   title: "Сортировка массива",
    //   description:
    //     "Задание: Напишите функцию, которая сортирует массив чисел по возрастанию.",
    //   exp: 70,
    //   money: 100,
    //   lockLevel: 2,
    // },
    // {
    //   id: 3,
    //   title: "Поиск максимального числа",
    //   description:
    //     "Задание: Напишите функцию, которая находит максимальное число в массиве.",
    //   exp: 60,
    //   money: 90,
    //   lockLevel: 3,
    // },
    // {
    //   id: 4,
    //   title: "Факториал числа",
    //   description:
    //     "Задание: Напишите функцию, которая вычисляет факториал заданного числа.",
    //   exp: 80,
    //   money: 120,
    //   lockLevel: 2,
    // },
    // {
    //   id: 5,
    //   title: "Обратный порядок строки",
    //   description:
    //     "Задание: Напишите функцию, которая возвращает строку в обратном порядке.",
    //   exp: 50,
    //   money: 75,
    //   lockLevel: 1,
    // },
    // {
    //   id: 6,
    //   title: "Проверка на четность числа",
    //   description:
    //     "Задание: Напишите функцию, которая проверяет, является ли число четным.",
    //   exp: 70,
    //   money: 100,
    //   lockLevel: 6,
    // },
    // {
    //   id: 7,
    //   title: "Сумма элементов массива",
    //   description:
    //     "Задание: Напишите функцию, которая вычисляет сумму всех элементов в массиве чисел.",
    //   exp: 60,
    //   money: 90,
    //   lockLevel: 3,
    // },
    // {
    //   id: 8,
    //   title: "Фибоначчи",
    //   description:
    //     "Задание: Напишите функцию, которая генерирует последовательность Фибоначчи до заданного числа.",
    //   exp: 85,
    //   money: 125,
    //   lockLevel: 4,
    // },
    // {
    //   id: 9,
    //   title: "Поиск минимального числа",
    //   description:
    //     "Задание: Напишите функцию, которая находит минимальное число в массиве.",
    //   exp: 60,
    //   money: 90,
    //   lockLevel: 3,
    // },
    // {
    //   id: 10,
    //   title: "Проверка простого числа",
    //   description:
    //     "Задание: Напишите функцию, которая проверяет, является ли заданное число простым.",
    //   exp: 75,
    //   money: 110,
    //   lockLevel: 5,
    // },
    // {
    //   id: 11,
    //   title: "Удаление дубликатов из массива",
    //   description:
    //     "Задание: Напишите функцию, которая удаляет все дубликаты из массива.",
    //   exp: 90,
    //   money: 130,
    //   lockLevel: 5,
    // },
    // {
    //   id: 12,
    //   title: "Перевод в верхний регистр",
    //   description:
    //     "Задание: Напишите функцию, которая переводит все символы строки в верхний регистр.",
    //   exp: 55,
    //   money: 80,
    //   lockLevel: 2,
    // },
    // {
    //   id: 13,
    //   title: "Количество гласных в строке",
    //   description:
    //     "Задание: Напишите функцию, которая считает количество гласных букв в строке.",
    //   exp: 65,
    //   money: 95,
    //   lockLevel: 4,
    // },
    // {
    //   id: 14,
    //   title: "Проверка анаграммы",
    //   description:
    //     "Задание: Напишите функцию, которая проверяет, являются ли две строки анаграммами (содержат одни и те же символы).",
    //   exp: 80,
    //   money: 120,
    //   lockLevel: 6,
    // },
    // {
    //   id: 15,
    //   title: "Решето Эратосфена",
    //   description:
    //     "Задание: Напишите функцию, которая реализует алгоритм Решето Эратосфена для нахождения всех простых чисел до заданного числа.",
    //   exp: 95,
    //   money: 140,
    //   lockLevel: 7,
    // },
    // {
    //   id: 16,
    //   title: "Бинарный поиск",
    //   description:
    //     "Задание: Напишите функцию, которая реализует алгоритм бинарного поиска для нахождения элемента в отсортированном массиве.",
    //   exp: 100,
    //   money: 150,
    //   lockLevel: 8,
    // },
  ],
  temporaryProjects: [
    {
      id: 1,
      level: 1,
      time: "14Д",
      title: "Проверка палиндрома",
      description:
        "Задание: Напишите функцию, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).",
      exp: 50,
      money: 75,
      lockLevel: 1,
    },
    {
      id: 2,
      level: 2,
      time: "2Д",
      title: "Сортировка массива",
      description:
        "Задание: Напишите функцию, которая сортирует массив чисел по возрастанию.",
      exp: 70,
      money: 100,
      lockLevel: 2,
    },
    {
      id: 3,
      level: 3,
      time: "1Д",
      title: "Поиск максимального числа",
      description:
        "Задание: Напишите функцию, которая находит максимальное число в массиве.",
      exp: 60,
      money: 90,
      lockLevel: 3,
    },
    {
      id: 4,
      level: 2,
      time: "3Д",
      title: "Факториал числа",
      description:
        "Задание: Напишите функцию, которая вычисляет факториал заданного числа.",
      exp: 80,
      money: 120,
      lockLevel: 2,
    },
    {
      id: 5,
      level: 1,
      time: "1Д",
      title: "Обратный порядок строки",
      description:
        "Задание: Напишите функцию, которая возвращает строку в обратном порядке.",
      exp: 50,
      money: 75,
      lockLevel: 1,
    },
    {
      id: 6,
      level: 6,
      time: "2Д",
      title: "Проверка на четность числа",
      description:
        "Задание: Напишите функцию, которая проверяет, является ли число четным.",
      exp: 70,
      money: 100,
      lockLevel: 6,
    },
  ],
  startedProjects: [
    {
      id: 1,
      level: "1",
      time: "1Д",
      title: "Проверка на анаграмму",
      description:
        "Задание: Напишите функцию, которая проверяет, являются ли две строки анаграммами (содержат одни и те же буквы в разном порядке).",
      exp: "50",
      money: "75",
    },
  ],
  completedProjects: [
    {
      id: 1,
      level: "1",
      stars: "5",
      title: "Проверка числа на простоту",
      description:
        "Напишите функцию, которая проверяет, является ли число простым (делится только на 1 и на само себя).",
      exp: "50",
      money: "75",
    },
    {
      id: 2,
      level: "2",
      stars: "20",
      title: "Объединение двух массивов",
      description:
        "Напишите функцию, которая объединяет два массива в один, исключая дубликаты.",
      exp: "70",
      money: "100",
    },
    {
      id: 3,
      level: "3",
      stars: "300",
      title: "Фибоначчи до N",
      description:
        "Напишите функцию, которая выводит последовательность Фибоначчи до N.",
      exp: "60",
      money: "90",
    },
    {
      id: 4,
      level: "3",
      stars: "1.5к",
      title: "Фибоначчи до N",
      description:
        "Напишите функцию, которая выводит последовательность Фибоначчи до N.",
      exp: "60",
      money: "90",
    },
  ],
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
