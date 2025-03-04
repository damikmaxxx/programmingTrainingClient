import React from 'react';
import styles from './Rating.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import { Link } from 'react-router-dom';
import "../styles/nicknameStyles.css";
import { GetStyleClassByName } from '../data/nicknameStyles.js';
import { useRatingStore, useUserStore } from '../store/store.js';

const tabs = [
  { id: 'expfull', label: 'ТОП-10 EXP' },
  { id: 'starsfull', label: 'ТОП-10 STARS' },
  { id: 'expweek', label: 'ТОП-10 недели EXP' },
  { id: 'starsweek', label: 'ТОП-10 недели STARS' },
];

const Rating = () => {
  const { topExpFull, topExpWeek, topStarsFull, topStarsWeek } = useRatingStore();
  const { name, id } = useUserStore();

  const MyRating = {
    userId: id,
    name: name,
    index: 999,
    exp: 10,
  };

  // Проверяем, есть ли пользователь в топе
  const isInTop = topExpFull.some(user => user.userId === MyRating.userId);

  return (
    <div className="container">
      <h1 className="text-center mb-3">Рейтинг пользователей</h1>
      <Tabs tabs={tabs} defaultActiveTab="expfull">
        <div className="tabs projects__tabs"><TabHeader tabs={tabs} /></div>
        <div className="tabs_container_dark">
          <Tab id="expfull">
            <div className={styles.rating}>
              <RatingItem index={1} {...topExpFull[0]} />
              <div className={styles.ratingScroll}>
                {topExpFull.slice(1).map((item, index) => (
                  <RatingItem key={item.id} index={index + 2} {...item} />
                ))}
              </div>
              {!isInTop && (
                <div className={styles.ratingItemLast}>
                  <RatingItem index={MyRating.index} {...MyRating} />
                </div>
              )}
            </div>
          </Tab>
          <Tab id="starsfull">
            {topStarsFull.map((item, index) => (
              <RatingItem key={item.id} index={index + 1} {...item} />
            ))}
          </Tab>
          <Tab id="expweek">
            {topExpWeek.map((item, index) => (
              <RatingItem key={item.id} index={index + 1} {...item} />
            ))}
          </Tab>
          <Tab id="starsweek">
            {topStarsWeek.map((item, index) => (
              <RatingItem key={item.id} index={index + 1} {...item} />
            ))}
          </Tab>
        </div>
      </Tabs>
    </div>
  );
};

export default Rating;


const RatingItem = ({ index, logo, name, exp, userId, textEffect="default" }) => {
  const avatarSrc = 'https://www.gravatar.com/avatar/?d=mp';
  const isTop = index <= 1;
  return (
    <div className={styles.ratingItem}>
      <Link to={`/profile/${userId}`} className={styles.userHeader}>
        <span className={styles.rank}>{index}</span>
        <div className={styles.avatar}>
          {isTop ? <img className={styles.crown} src="images/crown.png" alt="top" /> : <></>}
          <img src={avatarSrc} alt="аватарка" />
        </div>


        <span className={`${styles.userName} ${GetStyleClassByName(textEffect) || ''}`}>{name || 'User'}</span>
      </Link>
      <div className={styles.userRes}>EXP {exp || 50}</div>
    </div>

  );
};