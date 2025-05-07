import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../components/UI/Button/Button';

function Home() {
  return (
    <div className="container">
      <section className={styles.heroSection}>
        <h1 className={styles.title}>
        ProgPath: Твой путь к мастерству в программировании!
        </h1>
        <p className={styles.description}>
          ProgPath — это платформа, где ты учишься программировать, решая задачи, обмениваясь решениями и развиваясь в сообществе единомышленников.
        </p>
        <ul className={styles.features}>
          <li className={styles.featureItem}>Решай задачи и практикуйся в программировании</li>
          <li className={styles.featureItem}>Обменивайся решениями с сообществом</li>
          <li className={styles.featureItem}>Покупай стили для персонализации профиля</li>
          <li className={styles.featureItem}>Отслеживай прогресс и получай достижения</li>
        </ul>
        <div className={styles.buttonGroup}>
          <Link to="/registration">
            <Button >Зарегистрироваться</Button>
          </Link>
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;