import React from 'react';
import styles from './Shop.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Button from '../components/UI/Button/Button';
import "../styles/nicknameStyles.css";
import Select from '../components/UI/Select/Select.jsx';
import { useShopStore } from '../store/store.js';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';

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

const checkStyle = (item) => {
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
            {nicknameStyles.map((style) => (
              <div key={style.id} className="col-4">
                <div className={styles.shopItem + " dark-primary-color"}>
                  <div className={styles.shopItemName}>
                    <span className={style.className || ""}>USER NAME</span>
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
            ))}
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
  const { getStyleComponentByName } = useShopStore();

  return (
    <div className="row">
      {profileStyle.map((style) => {
        const StyleComponent = getStyleComponentByName(style.name);
        if (!StyleComponent) {
          return null; // Если компонент не найден, ничего не рендерим
        }
        return (
          <div key={style.id} className="col-4">
            <div className={`${styles.shopItem} dark-primary-color`}>
              <div className={styles.shopItemName}>
                <StyleComponent {...style.props}>
                  <span className={style.className || ""}>ПРОФИЛЬ</span>
                </StyleComponent>
              </div>
              <div>
                <h4>{style.name}</h4>
                <div className={styles.shopItemPrice}>
                  Цена: {renderPriceAndIcon(style)}
                </div>
                <span>
                  <Button className='me-3' variant="small" onClick={() => buyItem(style)}>
                    КУПИТЬ
                  </Button>
                  <Button variant="small" onClick={() => checkStyle(style)}>
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
