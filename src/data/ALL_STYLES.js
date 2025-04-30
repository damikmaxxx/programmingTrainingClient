import FireEffect from "../components/effects/FireEffect";
import SnowEffect from "../components/effects/SnowEffect";
import LaserEffect from "../components/effects/LaserEffect";


export const ALL_STYLES = [
  {
    id: 9,
    name: "Rainbow Animation",
    priceInCoin: 0,
    priceInStars: 0,
    className: "rainbow_animation_nickname",
    category: "nickname"
  },
  {
    id: 1,
    name: "Neon Blue",
    priceInCoin: 0,
    priceInStars: 0,
    className: "neon_blue_nickname",
    category: "nickname"
  },
  {
    id: 2,
    name: "Cyber Red",
    priceInCoin: 0,
    priceInStars: 0,
    className: "cyber_red_nickname",
    category: "nickname"
  },
  {
    id: 3,
    name: "Glowing Green",
    priceInCoin: 0,
    priceInStars: 0,
    className: "glowing_green_nickname",
    category: "nickname"
  },
  {
    id: 4,
    name: "Gold Shine",
    priceInCoin: 0,
    priceInStars: 0,
    className: "gold_shine_nickname",
    category: "nickname"
  },
  {
    id: 5,
    name: "Shadow Purple",
    priceInCoin: 0,
    priceInStars: 0,
    className: "shadow_purple_nickname",
    category: "nickname"
  },
  {
    id: 6,
    name: "Electric Pink",
    priceInCoin: 0,
    priceInStars: 0,
    className: "electric_pink_nickname",
    category: "nickname"
  },
  {
    id: 7,
    name: "Frost White",
    priceInCoin: 0,
    priceInStars: 0,
    className: "frost_white_nickname",
    category: "nickname"
  },
  {
    id: 8,
    name: "Fire Orange",
    priceInCoin: 0,
    priceInStars: 0,
    className: "fire_orange_nickname",
    category: "nickname"
  },
  {
    id: 10,
    name: "Underline Animation",
    priceInCoin: 0,
    priceInStars: 0,
    className: "wave_underline_nickname",
    category: "nickname"
  },
  {
    id: 11,
    name: "Typing Animation",
    priceInCoin: 0,
    priceInStars: 0,
    className: "typing_text_nickname",
    category: "nickname"
  },
  {
    id: 12,
    name: "Anim Nickname",
    priceInCoin: 0,
    priceInStars:0,
    className: "anim_nickname",
    category: "nickname"
  },
  {
    id: 13,
    name: "Fire Style",
    value: "FireStyle",
    priceInCoin: 0,
    priceInStars: 0,
    component: FireEffect,
    props: {
      speed: { x: 0, y: -50 }, 
      life: 200,              
      radius: 10,               
      particleCount: 100        
    },
    category: "profile"
  },
  {
    id: 14,
    name: "Snow Style",
    value: "SnowStyle",
    priceInCoin: 0,
    priceInStars: 0,
    component: SnowEffect,
    props: {
      speed: { x: 0, y: 0.5 },  
      life: 200,                 
      radius: 5,               
      particleCount: 10         
    },
    category: "profile"
  },
  {
    id: 15,
    name: "Laser Style",
    value: "LaserStyle",
    priceInCoin: 0,
    priceInStars: 0,
    component: LaserEffect,
    props: {
      speed: { x: 0.8, y: -1 },  
      life: 200,                              
      particleCount: 5,
      length: 50, 
      xOffset: -40, 
      yOffset: 20          
    },
    category: "profile"
  }
];


export function GetStyleClassById(id) {
  const effect = ALL_STYLES.find(style => style.id === id);
  return effect ? effect.className || null : null; // Возвращаем className, если он есть, иначе null
}

export function GetStyleComponentById(id) {
  const effect = ALL_STYLES.find(style => style.id === id);
  return effect ? effect.component || null : null; // Возвращаем компонент, если он есть, иначе null
}