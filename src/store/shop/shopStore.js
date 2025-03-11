import { create } from "zustand";
import FireEffect from "../../components/effects/FireEffect";
import SnowEffect from "../../components/effects/SnowEffect";
import LaserEffect from "../../components/effects/LaserEffect";
export const useShopStore = create((set, get) => ({
  testProfileStyle: "",
  nicknameStyles: [
    {
      id: 9,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
  ],
  profileStyle: [
    {
      id: 13,
    },
    {
      id: 14,
    },
    {
      id: 15,
    },
  ],
  setTestProfileStyle: (styleName) => set({ testProfileStyle: styleName }),
  // Функция для получения класса по имени стиля
  getStyleClassByName: (name) => {
    const effect = get().nicknameStyles.find((style) => style.name === name); // Используем get(), чтобы обратиться к состоянию
    return effect ? effect.className : null; // Возвращаем класс, если найдено
  },
  getStyleComponentByName: (name) => {
    const style = get().profileStyle.find((style) => style.name === name); // Используем get(), чтобы обратиться к состоянию
    return style ? style.component : null; // Возвращаем класс, если найдено
  },
}));
