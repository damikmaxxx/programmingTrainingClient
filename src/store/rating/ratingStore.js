import { create } from "zustand";

export const useRatingStore = create((set) => ({
  topExpFull: [  {
    id: 1,
    userId: 101,
    logo: 'img/avatar1.png',
    name: 'PlayerOne',
    exp: 1500,
    stars: 4.5,
    textEffect: 'Glowing Green' // Используем название эффекта
  },
  {
    id: 2,
    userId: 102,
    logo: 'img/avatar2.png',
    name: 'PlayerTwo',
    exp: 1400,
    stars: 4.2,
    textEffect: 'Rainbow Animation' // Используем название эффекта
  },
  {
    id: 3,
    userId: 103,
    logo: 'img/avatar3.png',
    name: 'PlayerThree',
    exp: 1350,
    stars: 4.8,
    textEffect: '' // Используем название эффекта
  },
  {
    id: 4,
    userId: 104,
    logo: 'img/avatar4.png',
    name: 'PlayerFour',
    exp: 1300,
    stars: 4.0,
    textEffect: 'Shadow Purple' // Используем название эффекта
  },
  {
    id: 5,
    userId: 105,
    logo: 'img/avatar5.png',
    name: 'PlayerFive',
    exp: 1250,
    stars: 3.9,
    textEffect: '' // Обычный текст
  },
  {
    id: 6,
    userId: 106,
    logo: 'img/avatar6.png',
    name: 'PlayerSix',
    exp: 1200,
    stars: 4.1,
    textEffect: '' // Обычный текст
  },
  {
    id: 7,
    userId: 107,
    logo: 'img/avatar7.png',
    name: 'PlayerSeven',
    exp: 1150,
    stars: 4.7,
    textEffect: '' // Обычный текст
  },
  {
    id: 8,
    userId: 108,
    logo: 'img/avatar8.png',
    name: 'PlayerEight',
    exp: 1100,
    stars: 3.8,
    textEffect: '' // Обычный текст
  },
  {
    id: 9,
    userId: 109,
    logo: 'img/avatar9.png',
    name: 'PlayerNine',
    exp: 1050,
    stars: 4.3,
    textEffect: 'Fire Orange' // Используем название эффекта
  },
  {
    id: 10,
    userId: 110,
    logo: 'img/avatar10.png',
    name: 'PlayerTen',
    exp: 1000,
    stars: 4.0,
    textEffect: '' // Обычный текст
  }],
  topExpWeek: [],
  topStarsFull: [],
  topStarsWeek: [],
  
  // Функции для сеттинга массивов
  setTopExpFull: (data) => set({ topExpFull: data }),
  setTopExpWeek: (data) => set({ topExpWeek: data }),
  setTopStarsFull: (data) => set({ topStarsFull: data }),
  setTopStarsWeek: (data) => set({ topStarsWeek: data }),
}));
