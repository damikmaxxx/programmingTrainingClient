import React, { useEffect } from 'react';
import styles from './Shop.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Button from '../components/UI/Button/Button';
import "../styles/nicknameStyles.css";
import Select from '../components/UI/Select/Select.jsx';
import { useShopStore, useUserStore } from '../store/store.js';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';
import { useNavigate } from 'react-router-dom';
import { ALL_STYLES, GetStyleComponentById } from '../data/ALL_STYLES.js';
import { shopAPI } from '../api/api';
import useShop from '../hooks/useShop.js';
import Loader from '../components/UI/Loader/Loader.jsx';

// Функция для отображения правильной цены и иконки в зависимости от типа
const renderPriceAndIcon = (style) => {
  if (style.price_in_coin > 0) {
    return <ItemCounter type="coin" count={style.price_in_coin} />;
  } else if (style.price_in_stars > 0) {
    return <ItemCounter type="star" count={style.price_in_stars} />;
  }
  return null;
};

const buyItem = (item) => {
  console.log(item);
};

const Shop = () => {
  const { nicknameStyles, profileStyle, setNicknameStyles, setProfileStyle } = useShopStore();
  const {name} = useUserStore();
  const { isLoading, shopStyles } = useShop(shopAPI);
  console.log(isLoading, shopStyles);
  const tabs = [
    { id: 'styleNames', label: 'Стили для имени' },
    { id: 'profileThemes', label: 'Темы профиля' },
    { id: 'other', label: 'Другое' },
  ];

  const sortedModes = [
    { value: "price", label: "По цене" },
    { value: "popular", label: "По популярности" },
    { value: "time", label: "По времени" },
  ];

  return (
    <div className="container">
      <h1 className="text-center mb-3">Магазин</h1>
      <Tabs tabs={tabs} defaultActiveTab="styleNames">
        <div className="row">
          <div className="col-lg-8 tabs projects__tabs">
            <TabHeader tabs={tabs} />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3 projects__tabs projects__tabs--sort">
            <h6>Сортировка</h6>
            <div className="select">
              <Select options={sortedModes} defaultValue="По умолчанию" placeholder="Выбери сортировку" />
            </div>
          </div>
        </div>
        <Tab id="styleNames">
          <div className="row">
            {isLoading ? (
              <Loader fullPage={false} />
            ) : (
              shopStyles.nickname.map((style) => {
                const s = ALL_STYLES.find(s => s.id === style.id);
                return (
                  <div key={style.id} className="col-4">
                    <div className={styles.shopItem + " dark-primary-color"}>
                      <div className={styles.shopItemName}>
                        <span className={s?.className || ""}>{name}</span>
                      </div>
                      <div>
                        <h4>{s?.name || "Неизвестный стиль"}</h4>
                        <div className={styles.shopItemPrice}>
                          Цена: {s ? renderPriceAndIcon(style) : "Неизвестно"}
                        </div>
                        <Button variant="small" onClick={() => s && buyItem(s)}>
                          КУПИТЬ
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Tab>
        <Tab id="profileThemes">
          <div className="row">
            {isLoading ? (
              <Loader fullPage={false} />
            ) : (
              <ProfileShopEffects profileStyle={profileStyle} shopStyles={shopStyles} />
            )}
          </div>
        </Tab>
        <Tab id="other">
          <div className="row">
            {isLoading ? (
              <Loader fullPage={false} />
            ) : (
              <p>СЮДА ЧТО-ТО УНИКАЛЬНОЕ ДОРОГОЕ ИЛИ УДАЛИТЬ</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

const ProfileShopEffects = ({ profileStyle, shopStyles }) => {
  const navigate = useNavigate();

  const checkStyle = (item) => {
    navigate('/profile/test-style/' + item.id);
  };

  return (
    <>
      {shopStyles.background_profile.map((style) => {
        const s = ALL_STYLES.find(s => s.id === style.id);
        console.log(s)
        const StyleComponent = GetStyleComponentById(style.id);
        if (!StyleComponent) {
          return null;
        }
        return (
          <div key={style.id} className="col-4">
            <div className={`${styles.shopItem} dark-primary-color`}>
              <div className={styles.shopItemName}>
                <StyleComponent {...s.props}>
                  <span className={s.className || ""}>ПРОФИЛЬ</span>
                </StyleComponent>
              </div>
              <div>
                <h4>{s.name}</h4>
                <div className={styles.shopItemPrice}>
                  Цена: {renderPriceAndIcon(style)}
                </div>
                <span>
                  <Button className="me-3" variant="small" onClick={() => buyItem(s)}>
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
    </>
  );
};

export default Shop;