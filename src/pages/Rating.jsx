import React from 'react';
import styles from './Rating.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import { Link } from 'react-router-dom';
import "../styles/nicknameStyles.css";
import { GetStyleClassByName } from '../data/nicknameStyles.js';

// Массив данных для рейтинга
const ratingData = [
  {
    id: 1,
    name: 'Пользователь 1',
    rating: 4.5,
    level: 1,
    time: '14Д',
    title: 'Проверка палиндрома',
    description: 'Задание: Напишите функцию, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).',
    exp: 50,
    money: 75,
    lockLevel: 1,
  },
  {
    id: 2,
    name: 'Пользователь 2',
    rating: 3.8,
    level: 2,
    time: '2Д',
    title: 'Сортировка массива',
    description: 'Задание: Напишите функцию, которая сортирует массив чисел по возрастанию.',
    exp: 70,
    money: 100,
    lockLevel: 2,
  },
  {
    id: 3,
    name: 'Пользователь 3',
    rating: 5.0,
    level: 3,
    time: '1Д',
    title: 'Поиск максимального числа',
    description: 'Задание: Напишите функцию, которая находит максимальное число в массиве.',
    exp: 60,
    money: 90,
    lockLevel: 3,
  },
  {
    id: 4,
    name: 'Пользователь 4',
    rating: 4.2,
    level: 2,
    time: '3Д',
    title: 'Факториал числа',
    description: 'Задание: Напишите функцию, которая вычисляет факториал заданного числа.',
    exp: 80,
    money: 120,
    lockLevel: 2,
  },
  {
    id: 5,
    name: 'Пользователь 5',
    rating: 3.9,
    level: 1,
    time: '1Д',
    title: 'Обратный порядок строки',
    description: 'Задание: Напишите функцию, которая возвращает строку в обратном порядке.',
    exp: 50,
    money: 75,
    lockLevel: 1,
  },
  {
    id: 6,
    name: 'Пользователь 6',
    rating: 3.5,
    level: 6,
    time: '2Д',
    title: 'Проверка на четность числа',
    description: 'Задание: Напишите функцию, которая проверяет, является ли число четным.',
    exp: 70,
    money: 100,
    lockLevel: 6,
  },
];


const tabs = [
  {
    id: 'expfull',
    label: 'ТОП-10 EXP',
  },
  {
    id: 'starsfull',
    label: 'ТОП-10 STARS',
  },
  {
    id: 'expweek',
    label: 'ТОП-10 недели EXP',
  },
  {
    id: 'starsweek',
    label: 'ТОП-10 недели STARS',
  },
];

const topPlayers = [
  {
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
  }
];

const Rating = () => {
  return (
    <div className="container" >
      <h1 className="text-center mb-3">Рейтинг пользователей</h1>
      <Tabs tabs={tabs} defaultActiveTab="expfull">
        <div className=" tabs  projects__tabs"><TabHeader tabs={tabs} /></div>
        <div className="tabs_container_dark">
        <Tab id="expfull">
          <div className={styles.rating}>
            {topPlayers.map((item) => (
              <RatingItem key={item.id} {...item} />
            ))}
          </div>
        </Tab>
        <Tab id="starsfull">
          starsfull
        </Tab>
        <Tab id="expweek">
          expweek
        </Tab>
        <Tab id="starsweek">
          stars
        </Tab>
        </div>
      </Tabs>

    </div>
  );
};

export default Rating;

const RatingItem = ({ logo, name, exp,userId , textEffect }) => {
  // Если logo не передан, используем дефолтное изображение
  // const avatarSrc = logo ||  'https://www.gravatar.com/avatar/?d=mp';
  const avatarSrc = 'https://www.gravatar.com/avatar/?d=mp';
  return (
    <div className={styles.ratingItem}>
      <Link to={"/profile/"+ userId} className={styles.userHeader}>
        <img src={avatarSrc} alt="аватарка" />
        <span className={`${styles.userName} +" "+ ${GetStyleClassByName(textEffect)} || ''`}>{name || 'User 1'}</span>
      </Link>
      <div className={styles.userRes}>
        EXP {exp || 50}
      </div>
    </div>
  );
};


