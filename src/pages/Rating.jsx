import React, { useEffect, useState } from 'react';
import styles from './Rating.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import { Link } from 'react-router-dom';
import "../styles/nicknameStyles.css";
import { GetStyleClassById } from '../data/ALL_STYLES.js';
import { useRatingStore, useUserStore } from '../store/store.js';
import Loader from '../components/UI/Loader/Loader.jsx';
import { ratingAPI } from '../api/api.js';
import { DEFAULT_USER_IMAGE } from '../utils/consts.js';
const tabs = [
  { id: 'expfull', label: 'ТОП-10 EXP' },
  { id: 'starsfull', label: 'ТОП-10 STARS' },
  { id: 'expshort', label: 'ТОП-10 месяца EXP' },
  { id: 'starsshort', label: 'ТОП-10 месяца STARS' },
];

const Rating = () => {
  const { topExpFull = [], topStarsFull = [], topExpMonth = [], topStarsMonth = [], setTopExpMonth, setTopStarsMonth, setTopExpFull, setTopStarsFull } = useRatingStore();
  const [isLoading, setIsLoading] = useState(true);
  const { name, id } = useUserStore();
  const [currentUserRatings, setCurrentUserRatings] = useState({
    expfull: null,
    starsfull: null,
    expshort: null,
    starsshort: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [expFull, starsFull, expMonth, starsMonth] = await Promise.all([
          ratingAPI.getExperienceRanking('all_time', 10),
          ratingAPI.getStarsRanking('all_time', 10),
          ratingAPI.getExperienceRanking('month', 10),
          ratingAPI.getStarsRanking('month', 10),
        ]);
        setTopExpFull(expFull.users.map(user => ({
          userId: user.user_id,
          username: user.username,
          photo: user.photo,
          textEffectId: user.nickname_id,
          total_experience: user.total_experience || 0,
          total_stars: 0,
        })));
        setTopStarsFull(starsFull.users.map(user => ({
          userId: user.user_id,
          username: user.username,
          photo: user.photo,
          textEffectId: user.nickname_id,
          total_experience: 0,
          total_stars: user.total_stars || 0,
        })));
        setTopExpMonth(expMonth.users.map(user => ({
          userId: user.user_id,
          username: user.username,
          photo: user.photo,
          textEffectId: user.nickname_id,
          total_experience: user.total_experience || 0,
          total_stars: 0,
        })));
        setTopStarsMonth(starsMonth.users.map(user => ({
          userId: user.user_id,
          username: user.username,
          photo: user.photo,
          textEffectId: user.nickname_id,
          total_experience: 0,
          total_stars: user.total_stars || 0,
        })));
        // Сохраняем рейтинговые данные текущего пользователя для каждой вкладки
        setCurrentUserRatings({
          expfull: expFull.current_user_ranking ? {
            userId: expFull.current_user_ranking.user_id,
            username: expFull.current_user_ranking.username,
            photo: expFull.current_user_ranking.photo,
            textEffectId: expFull.current_user_ranking.nickname_id,
            total_experience: expFull.current_user_ranking.total_experience || 0,
            total_stars: 0,
            index: expFull.current_user_ranking.position || 999999,
          } : null,
          starsfull: starsFull.current_user_ranking ? {
            userId: starsFull.current_user_ranking.user_id,
            username: starsFull.current_user_ranking.username,
            photo: starsFull.current_user_ranking.photo,
            textEffectId: starsFull.current_user_ranking.nickname_id,
            total_experience: 0,
            total_stars: starsFull.current_user_ranking.total_stars || 0,
            index: starsFull.current_user_ranking.position || 999999,
          } : null,
          expshort: expMonth.current_user_ranking ? {
            userId: expMonth.current_user_ranking.user_id,
            username: expMonth.current_user_ranking.username,
            photo: expMonth.current_user_ranking.photo,
            textEffectId: expMonth.current_user_ranking.nickname_id,
            total_experience: expMonth.current_user_ranking.total_experience || 0,
            total_stars: 0,
            index: expMonth.current_user_ranking.position || 999999,
          } : null,
          starsshort: starsMonth.current_user_ranking ? {
            userId: starsMonth.current_user_ranking.user_id,
            username: starsMonth.current_user_ranking.username,
            photo: starsMonth.current_user_ranking.photo,
            textEffectId: starsMonth.current_user_ranking.nickname_id,
            total_experience: 0,
            total_stars: starsMonth.current_user_ranking.total_stars || 0,
            index: starsMonth.current_user_ranking.position || 999999,
          } : null,
        });
      } catch (error) {
        console.error("Ошибка загрузки рейтинга:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setTopExpFull, setTopStarsFull, setTopExpMonth, setTopStarsMonth]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <h1 className="text-center mb-3">Рейтинг пользователей</h1>
      <Tabs tabs={tabs} defaultActiveTab="expfull">
        <div className="tabs projects__tabs"><TabHeader tabs={tabs} /></div>
        <div className="tabs_container_dark">
          <Tab id="expfull">
            <div className={styles.rating}>
              {topExpFull.length > 0 && (
                <>
                  <RatingItem key={topExpFull[0].userId} index={1} {...topExpFull[0]} />
                  <div className={styles.ratingScroll}>
                    {topExpFull.slice(1).map((item, idx) => (
                      <RatingItem 
                        key={`${item.userId}-${idx}`} 
                        index={idx + 2} 
                        {...item} 
                      />
                    ))}
                  </div>
                </>
              )}
              {currentUserRatings.expfull.index > 10 && !topExpFull.some(user => user.userId === id) && currentUserRatings.expfull && (
                <div className={styles.ratingItemLast}>
                  <RatingItem key={currentUserRatings.expfull.userId} {...currentUserRatings.expfull} />
                </div>
              )}
            </div>
          </Tab>
          <Tab id="starsfull">
            <div className={styles.rating}>
              {topStarsFull.length > 0 && (
                <>
                  <RatingItem key={topStarsFull[0].userId} index={1} {...topStarsFull[0]} />
                  <div className={styles.ratingScroll}>
                    {topStarsFull.slice(1).map((item, idx) => (
                      <RatingItem 
                        key={`${item.userId}-${idx}`} 
                        index={idx + 2} 
                        {...item} 
                      />
                    ))}
                  </div>
                </>
              )}
              {currentUserRatings.starsfull.index > 10 && !topStarsFull.some(user => user.userId === id) && currentUserRatings.starsfull && (
                <div className={styles.ratingItemLast}>
                  <RatingItem key={currentUserRatings.starsfull.userId} {...currentUserRatings.starsfull} />
                </div>
              )}
            </div>
          </Tab>
          <Tab id="expshort">
            <div className={styles.rating}>
              {topExpMonth.length > 0 && (
                <>
                  <RatingItem key={topExpMonth[0].userId} index={1} {...topExpMonth[0]} />
                  <div className={styles.ratingScroll}>
                    {topExpMonth.slice(1).map((item, idx) => (
                      <RatingItem 
                        key={`${item.userId}-${idx}`} 
                        index={idx + 2} 
                        {...item} 
                      />
                    ))}
                  </div>
                </>
              )}
              {currentUserRatings.expshort.index > 10 && !topExpMonth.some(user => user.userId === id) && currentUserRatings.expshort && (
                <div className={styles.ratingItemLast}>
                  <RatingItem key={currentUserRatings.expshort.userId} {...currentUserRatings.expshort} />
                </div>
              )}
            </div>
          </Tab>
          <Tab id="starsshort">
            <div className={styles.rating}>
              {topStarsMonth.length > 0 && (
                <>
                  <RatingItem key={topStarsMonth[0].userId} index={1} {...topStarsMonth[0]} />
                  <div className={styles.ratingScroll}>
                    {topStarsMonth.slice(1).map((item, idx) => (
                      <RatingItem 
                        key={`${item.userId}-${idx}`} 
                        index={idx + 2} 
                        {...item} 
                      />
                    ))}
                  </div>
                </>
              )}
              {currentUserRatings.starsshort.index > 10 && !topStarsMonth.some(user => user.userId === id) && currentUserRatings.starsshort && (
                <div className={styles.ratingItemLast}>
                  <RatingItem key={currentUserRatings.starsshort.userId} {...currentUserRatings.starsshort} />
                </div>
              )}
            </div>
          </Tab>
        </div>
      </Tabs>
    </div>
  );
};

export default Rating;

const RatingItem = ({ index, photo, username, total_experience, total_stars, userId, textEffectId }) => {
  const [imgSrc, setImgSrc] = useState(photo || DEFAULT_USER_IMAGE);
  const isTop = index <= 1;

  const handleImageError = () => {
    setImgSrc(DEFAULT_USER_IMAGE);
  };

  const renderStats = () => {
    if (total_experience > 0) {
      return <div className={styles.userRes}>EXP {total_experience}</div>;
    } else if (total_stars > 0) {
      return <div className={styles.userRes}>Stars {total_stars}</div>;
    }
    return null;
  };

  return (
    <div className={styles.ratingItem}>
      <Link to={`/profile/${userId}`} className={styles.userHeader}>
        <span className={styles.rank}>{index === 999999 ? "-" : index }</span>
        <div className={styles.avatar}>
          {isTop ? <img className={styles.crown} src="images/crown.png" alt="top" /> : null}
          <img
            src={imgSrc}
            alt="аватарка"
            onError={handleImageError}
          />
        </div>
        <span className={`${styles.userName} ${GetStyleClassById(textEffectId) || ''}`}>
          {username}
        </span>
      </Link>
      {renderStats()}
    </div>
  );
};