import { create } from "zustand";
import FireEffect from "../../components/effects/FireEffect";
import SnowEffect from "../../components/effects/SnowEffect";
import LaserEffect from "../../components/effects/LaserEffect";
export const useShopStore = create((set,get) => ({
  nicknameStyles: [
    {
      id: 9,
      name: "Rainbow Animation",
      priceInCoin: 2600,
      priceInStars: 0,
      className: "rainbow_animation_nickname",
    },
    {
      id: 1,
      name: "Neon Blue",
      priceInCoin: 500,
      priceInStars: 0,
      className: "neon_blue_nickname",
    },
    {
      id: 2,
      name: "Cyber Red",
      priceInCoin: 700,
      priceInStars: 0,
      className: "cyber_red_nickname",
    },
    {
      id: 3,
      name: "Glowing Green",
      priceInCoin: 600,
      priceInStars: 0,
      className: "glowing_green_nickname",
    },
    {
      id: 4,
      name: "Gold Shine",
      priceInCoin: 0,
      priceInStars: 6,
      className: "gold_shine_nickname",
    },
    {
      id: 5,
      name: "Shadow Purple",
      priceInCoin: 0,
      priceInStars: 3,
      className: "shadow_purple_nickname",
    },
    {
      id: 6,
      name: "Electric Pink",
      priceInCoin: 0,
      priceInStars: 2,
      className: "electric_pink_nickname",
    },
    {
      id: 7,
      name: "Frost White",
      priceInCoin: 0,
      priceInStars: 4,
      className: "frost_white_nickname",
    },
    {
      id: 8,
      name: "Fire Orange",
      priceInCoin: 2,
      priceInStars: 0,
      className: "fire_orange_nickname",
    },
    {
      id: 10,
      name: "Underline Animation",
      priceInCoin: 0,
      priceInStars:15,
      className: "wave_underline_nickname",
    },
    {
      id: 11,
      name: "Typing Animation",
      priceInCoin: 0,
      priceInStars: 2,
      className: "typing_text_nickname",
    },
    {
      id: 12,
      name: "Anim Nickname",
      priceInCoin: 0,
      priceInStars: 7,
      className: "anim_nickname",
    },
  ],
  profileStyle: [
    {
      id: 1,
      name: "Fire Style",
      priceInCoin: 0,
      priceInStars: 20,
      component: FireEffect,
      props: {
        speed: { x: 0, y: -50 }, 
        life: 200,              
        radius: 10,               
        particleCount: 100        
      }
    },
    {
      id: 2,
      name: "Snow Style",
      priceInCoin: 0,
      priceInStars: 10,
      component: SnowEffect,
      props: {
        speed: { x: 0, y: 0.5 },  
        life: 200,                 
        radius: 5,               
        particleCount: 10         
      }
    },
    {
      id: 3,
      name: "Laser Style",
      priceInCoin: 0,
      priceInStars: 25,
      component: LaserEffect,
      props: {
        speed: { x: 0.8, y: -1 },  
        life: 200,                              
        particleCount: 5,
        length: 50, 
        xOffset: -40, // Новый проп для смещения по X
        yOffset: 20,  // Новый проп для смещения по Y         
      }
    },
    // и так далее для других тем
  ],
  
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
