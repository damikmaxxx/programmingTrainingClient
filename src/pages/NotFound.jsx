import React from 'react';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>404</h2>
      <p className={styles.text}>Ой! Кажется, вы заблудились.</p>
      <p className={styles.text}>Страница, которую вы ищете, не существует или была перемещена.</p>
      <a href="/" className={styles.homeLink}>Вернуться на главную</a>
    </div>
  );
}

export default NotFound;