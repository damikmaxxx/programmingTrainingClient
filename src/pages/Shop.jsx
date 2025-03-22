import React from 'react';
import styles from './Shop.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Button from '../components/UI/Button/Button';
import "../styles/nicknameStyles.css";
import Select from '../components/UI/Select/Select.jsx';
import { useShopStore, useUserStore } from '../store/store.js';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';
import { useNavigate } from 'react-router-dom';
import { ALL_STYLES, GetStyleComponentById } from '../data/ALL_STYLES.js';

// Функция для отображения правильной цены и иконки в зависимости от типа
const renderPriceAndIcon = (style) => {
  if (style.priceInCoin > 0) {
    return <ItemCounter type="coin" count={style.priceInCoin} />;
  } else if (style.priceInStars > 0) {
    return <ItemCounter type="star" count={style.priceInStars} />;
  }
  return null;
};

const buyItem = (item) => {
  console.log(item);
}


const Shop = () => {
  const { nicknameStyles, profileStyle } = useShopStore();
  const tabs = [
    {
      id: 'styleNames',
      label: 'Стили для имени',
    },
    {
      id: 'profileThemes',
      label: 'Темы профиля',
    },
    {
      id: 'other',
      label: 'Другое',
    },
  ];


  const sortedModes = [
    { value: "price", label: "По цене" },
    { value: "popular", label: "По популярности" },
    { value: "time", label: "По времени" },
  ];



  return (
    <div className="container" >
      <h1 className="text-center mb-3">Магазин</h1>
      <Tabs tabs={tabs} defaultActiveTab="styleNames">
        <div className="row">
          <div className="col-lg-8 tabs  projects__tabs"><TabHeader tabs={tabs} /></div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3 projects__tabs projects__tabs--sort">
            <h6>Сортировка</h6>
            <div className='select'>
              <Select options={sortedModes} defaultValue='По умолчанию' placeholder='Выбери сортировку' />
            </div>
          </div>
        </div>
        <Tab id="styleNames">
          <div className="row">
            {nicknameStyles.map(({ id }) => {
              const s = ALL_STYLES.find(s => s.id === id);

              return (
                <div key={id} className="col-4">
                  <div className={styles.shopItem + " dark-primary-color"}>
                    <div className={styles.shopItemName}>
                      <span className={s?.className || ""}>USER NAME</span>
                    </div>
                    <div>
                      <h4>{s?.name}</h4>
                      <div className={styles.shopItemPrice}>
                        Цена: {s ? renderPriceAndIcon(s) : "Неизвестно"}
                      </div>
                      <Button variant="small" onClick={() => s && buyItem(s)}>КУПИТЬ</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Tab>
        <Tab id="profileThemes">
          <div className="row">
            <ProfileShopEffects profileStyle={profileStyle} />
            {/* {profileStyle.map((style) => (
              <div key={style.id} className="col-4">
                <div className={styles.shopItem + " dark-primary-color"}>
                  <div className={styles.shopItemName}>
                    <{getStyleComponentByName()} />
                    <span className={style.className || ""}>ПРОФИЛЬ</span>
                  </div>
                  <div>
                    <h4>{style.name}</h4>
                    <div className={styles.shopItemPrice}>
                      Цена: {renderPriceAndIcon(style)}
                    </div>
                    <Button variant="small" onClick={() => buyItem(style)}>КУПИТЬ</Button>
                  </div>
                </div>
              </div>
            ))} */}

          </div>
        </Tab>
        <Tab id="other">
          СЮДА ЧТО-ТО УНИКАЛЬНОЕ ДОРОГОЕ ИЛИ  УДАЛИТЬ
        </Tab>
      </Tabs>
    </div>
  );
};

export default Shop;


const ProfileShopEffects = ({ profileStyle }) => {
  const { getStyleComponentByName,} = useShopStore();
  const navigate = useNavigate();

  const checkStyle = (item) => {
    navigate('/profile/test-style/'+item.id); // Перенаправляем на страницу профиля
  }
  return (
    <div className="row">
      {profileStyle.map(({ id }) => {
        const s = ALL_STYLES.find(s => s.id === id);
        const StyleComponent = GetStyleComponentById(id);
        if (!StyleComponent) {
          return null; // Если компонент не найден, ничего не рендерим
        }
        return (
          <div key={s.id} className="col-4">
            <div className={`${styles.shopItem} dark-primary-color`}>
              <div className={styles.shopItemName}>
                <StyleComponent {...s.props}>
                  <span className={s.className || ""}>ПРОФИЛЬ</span>
                </StyleComponent>
              </div>
              <div>
                <h4>{s.name}</h4>
                <div className={styles.shopItemPrice}>
                  Цена: {renderPriceAndIcon(s)}
                </div>
                <span>
                  <Button className='me-3' variant="small" onClick={() => buyItem(s)}>
                    КУПИТЬ
                  </Button>
                  <Button variant="small" onClick={() => checkStyle(s)}>
                    ПОСМОТРЕТЬ
                  </Button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
