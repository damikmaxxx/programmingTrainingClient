import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Home.module.css"

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">

        <h1>Добро пожаловать в мир, где обучение программированию превращается в захватывающее приключение!</h1>
        </div>
      </div>
      {/* Блок с кнопками регистрации и входа */}
      <section>
        <Link to="/register">
          <button>Регистрация</button>
        </Link>
        <Link to="/login">
          <button>Войти</button>
        </Link>
      </section>

      {/* Блок с последними обновлениями */}
      <section>
        <h2>Последние обновления</h2>
        <ul>
          <li>Обновление 1: Описание обновления.</li>
          <li>Обновление 2: Описание обновления.</li>
          <li>Обновление 3: Описание обновления.</li>
          <li>НАДО БЫ СОЗДАТЬ СТРАНИЦУ ЗАГОЛОВОК , КУДА ПОПАДАЮТ НЕЗАРЕГАННЫЕ ПОЛЬЗОВАТЕЛИ И УЖЕ НОВУЮ СТРАНИЦУ С НОВОСТЯМИ ИЛИ ЧЕТО ТАКОЕ</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;