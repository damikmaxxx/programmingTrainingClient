import React, { useEffect, useState } from 'react';
import styles from './Rating.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import { Link } from 'react-router-dom';
import "../styles/nicknameStyles.css";
import { GetStyleClassById} from '../data/ALL_STYLES.js';
import { useRatingStore, useUserStore } from '../store/store.js';
import Loader from '../components/UI/Loader/Loader.jsx';
import { ratingAPI } from '../api/api.js';
const tabs = [
  { id: 'expfull', label: 'ТОП-10 EXP' },
  { id: 'starsfull', label: 'ТОП-10 STARS' },
  { id: 'expshort', label: 'ТОП-10 недели EXP' },
  { id: 'starsshort', label: 'ТОП-10 недели STARS' },
];

const Rating = () => {
  const { topExpFull, topExpWeek, topStarsFull, topStarsWeek,topExpMonth,topStarsMonth,setTopExpMonth,setTopStarsMonth, setTopExpFull,setTopStarsFull } = useRatingStore();
    const [isLoading, setIsLoading] = useState(true);
  const { name, id } = useUserStore();

  const MyRating = {
    userId: id,
    name: name,
    index: 999,
    exp: 10,
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const [expFull, starsFull,expMonth,starsMonth] = await Promise.all([
          ratingAPI.getExperienceRanking('all_time', 10),
          ratingAPI.getStarsRanking('all_time', 10),
          ratingAPI.getExperienceRanking('month', 10),
          ratingAPI.getStarsRanking('month', 10)
        ]);
        console.log(expFull, starsFull)
        setTopExpFull(expFull);
        setTopStarsFull(starsFull);
        setTopExpMonth(expMonth);
        setTopStarsMonth(starsMonth);
      } catch (error) {
        console.error("Ошибка загрузки рейтинга:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  // Проверяем, есть ли пользователь в топе
  const isInTop = topExpFull.some(user => user.userId === MyRating.userId);

  if (isLoading) return <Loader />; 
  return (
    <div className="container">
      <h1 className="text-center mb-3">Рейтинг пользователей</h1>
      <Tabs tabs={tabs} defaultActiveTab="expfull">
        <div className="tabs projects__tabs"><TabHeader tabs={tabs} /></div>
        <div className="tabs_container_dark">
          <Tab id="expfull">
            <div className={styles.rating}>
              <RatingItem key={0} index={1} {...topExpFull[0]} />
              <div className={styles.ratingScroll}>
                {topExpFull?.slice(1).map((item, index) => (
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
            <div className={styles.rating}>
              <RatingItem key={0} index={1} {...topStarsFull[0]} />
              <div className={styles.ratingScroll}>
                {topStarsFull?.slice(1).map((item, index) => (
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
          <Tab id="expshort">
            <div className={styles.rating}>
              <RatingItem key={0} index={1} {...topStarsFull[0]} />
              <div className={styles.ratingScroll}>
                {topExpMonth?.slice(1).map((item, index) => (
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
          <Tab id="starsshort">
            <div className={styles.rating}>
              <RatingItem key={0} index={1} {...topStarsFull[0]} />
              <div className={styles.ratingScroll}>
                {topStarsMonth?.slice(1).map((item, index) => (
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
          {/* <Tab id="expshort">
            {topExpMonth.map((item, index) => (
              <RatingItem key={item.id} index={index + 1} {...item} />
            ))}
          </Tab>
          <Tab id="starsshort">
            {topStarsMonth.map((item, index) => (
              <RatingItem key={item.id} index={index + 1} {...item} />
            ))}
          </Tab> */}
        </div>
      </Tabs>
    </div>
  );
};

export default Rating;


const RatingItem = ({ index, photo, username, total_experience, userId, textEffectId }) => {
  const DEFAULT_AVATAR_SRC = 'https://www.gravatar.com/avatar/?d=mp';
  const [imgSrc, setImgSrc] = useState(photo || DEFAULT_AVATAR_SRC); // Изначально пытаемся загрузить photo
  const isTop = index <= 1;

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImgSrc(DEFAULT_AVATAR_SRC); // Если фото не загрузилось, подставляем дефолт
  };

  return (
    <div className={styles.ratingItem}>
      <Link to={`/profile/${userId}`} className={styles.userHeader}>
        <span className={styles.rank}>{index}</span>
        <div className={styles.avatar}>
          {isTop ? <img className={styles.crown} src="images/crown.png" alt="top" /> : null}
          <img
            src={imgSrc}
            alt="аватарка"
            onError={handleImageError} // Срабатывает, если изображение не загрузилось
          />
        </div>
        <span className={`${styles.userName} ${GetStyleClassById(textEffectId) || ''}`}>
          {username}
        </span>
      </Link>
      <div className={styles.userRes}>EXP {total_experience}</div>
    </div>
  );
};