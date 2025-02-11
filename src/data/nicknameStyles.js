export const nicknameStyles = [
  {
    id: 9,
    name: "Rainbow Animation",
    price: 2600,
    className: "rainbow_animation_nickname",
  },
  {
    id: 1,
    name: "Neon Blue",
    price: 500,
    className: "neon_blue_nickname",
  },
  {
    id: 2,
    name: "Cyber Red",
    price: 700,
    className: "cyber_red_nickname",
  },
  {
    id: 3,
    name: "Glowing Green",
    price: 600,
    className: "glowing_green_nickname",
  },
  {
    id: 4,
    name: "Gold Shine",
    price: 1000,
    className: "gold_shine_nickname",
  },
  {
    id: 5,
    name: "Shadow Purple",
    price: 750,
    className: "shadow_purple_nickname",
  },
  {
    id: 6,
    name: "Electric Pink",
    price: 800,
    className: "electric_pink_nickname",
  },
  {
    id: 7,
    name: "Frost White",
    price: 900,
    className: "frost_white_nickname",
  },
  {
    id: 8,
    name: "Fire Orange",
    price: 650,
    className: "fire_orange_nickname",
  },
  {
    id: 10,
    name: "Underline Animation",
    price: 650,
    className: "wave_underline_nickname",
  },
  {
    id: 11,
    name: "Typing Animation",
    price: 650,
    className: "typing_text_nickname",
  },
  {
    id: 12,
    name: "Anim Nickname",
    price: 650,
    className: "anim_nickname",
  },
];


export function GetStyleClassByName(name) {
  const effect = nicknameStyles.find(style => style.name === name);
  return effect ? effect.className : null; // Возвращаем класс, если найден, или null, если не найдено
}