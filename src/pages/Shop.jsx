import React, { useEffect, useState } from 'react';
import styles from './Shop.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Button from '../components/UI/Button/Button';
import "../styles/nicknameStyles.css";
import Select from '../components/UI/Select/Select.jsx';
import { useShopStore, useUserStore } from '../store/store.js';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';
import { useNavigate } from 'react-router-dom';
import { ALL_STYLES, GetStyleComponentById } from '../data/ALL_STYLES.js';
import { shopAPI, userAPI } from '../api/api';
import { STYLE_CATEGORY_NICKNAME, STYLE_CATEGORY_BACKGROUND_PROFILE } from '../api/api';
import useShop from '../hooks/useShop.js';
import Loader from '../components/UI/Loader/Loader.jsx';
import { useNotification } from '../components/Shared/NotificationProvider/NotificationProvider';
import { handleServerErrors } from '../utils/handleServerErrors/handleServerErrors';

// Функция для отображения правильной цены и иконки в зависимости от типа
const renderPriceAndIcon = (style) => {
  if (style.price_in_coin > 0) {
    return <ItemCounter type="coin" count={style.price_in_coin} />;
  } else if (style.price_in_stars > 0) {
    return <ItemCounter type="star" count={style.price_in_stars} />;
  }
  return null;
};

// Функция для покупки стиля
const buyItem = async (item, notify) => {
  if (item.category === "map") {
    const purchasedMaps = JSON.parse(localStorage.getItem('purchasedMaps') || '[]');
    if (!purchasedMaps.includes(item.id)) {
      purchasedMaps.push(item.id);
      localStorage.setItem('purchasedMaps', JSON.stringify(purchasedMaps));
      notify('Карта успешно куплена!', 'success');
    } else {
      notify('Эта карта уже куплена!', 'info');
    }
    return; // Прерываем выполнение для карт, так как нет API

  }
  try {
    const styleData = {
      style_id: item.id,
      is_active: false, // По умолчанию стиль не активируется при покупке
      currency: item.price_in_coin > 0 ? 'coins' : 'stars', // Определяем валюту
    };

    const response = await userAPI.buyUserStyle(styleData);
    notify('Стиль успешно куплен!', 'success');
  } catch (error) {
    console.error('Ошибка при покупке стиля:', error);
    handleServerErrors(error.response?.data, notify, {
      defaultMessage: 'Ошибка при покупке стиля. Попробуйте снова.',
      fieldNames: {
        style_id: 'Стиль',
        currency: 'Валюта',
        detail: 'Ошибка',
      },
    });
  }
};

const Shop = () => {
  const { nicknameStyles, profileStyle, setNicknameStyles, setProfileStyle } = useShopStore();
  const { name } = useUserStore();
  const [sortOrder, setSortOrder] = useState('');
  const { isLoading, shopStyles } = useShop(shopAPI, sortOrder);
  const { notify } = useNotification();

  const tabs = [
    { id: 'styleNames', label: 'Стили для имени' },
    { id: 'profileThemes', label: 'Темы профиля' },
    // { id: 'maps', label: 'Карты' },
  ];

  const sortedModes = [
    { value: "", label: "По умолчанию" },
    { value: "price_in_stars", label: "По звёздам (возрастание)" },
    { value: "-price_in_stars", label: "По звёздам (убывание)" },
    { value: "price_in_coin", label: "По коинам (возрастание)" },
    { value: "-price_in_coin", label: "По коинам (убывание)" },
  ];

  // Массив с картой, включая иконку Python
  const maps = [
    { id: 20, name: 'Изучение Python', price_in_coin: 10, icon: 'https://img.icons8.com/?size=240&id=l75OEUJkPAk4&format=png', category: 'map' },
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
              <Select
                options={sortedModes}
                defaultValue="По умолчанию"
                placeholder="Выбери сортировку"
                onChange={({ value }) => setSortOrder(value)}
              />
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
                        <Button variant="small" onClick={() => s && buyItem(style, notify)}>
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
              <ProfileShopEffects profileStyle={profileStyle} shopStyles={shopStyles} notify={notify} />
            )}
          </div>
        </Tab>
        <Tab id="maps">
          <div className="row">
            {isLoading ? (
              <Loader fullPage={false} />
            ) : (
              maps.map((map) => (
                <div key={map.id} className="col-4">
                  <div className={styles.shopItem + " dark-primary-color"}>
                    <div className={styles.shopItemName}>
                      <img src={map.icon} alt="Иконка карты" className={styles.mapIcon} />
                    </div>
                    <div>
                      <h4>{map.name}</h4>
                      <div className={styles.shopItemPrice}>
                        Цена: {renderPriceAndIcon(map)}
                      </div>
                      <Button variant="small" onClick={() => buyItem(map, notify)}>
                        КУПИТЬ
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

const ProfileShopEffects = ({ profileStyle, shopStyles, notify }) => {
  const navigate = useNavigate();

  const checkStyle = (item) => {
    navigate('/profile/test-style/' + item.id);
  };

  return (
    <>
      {shopStyles.background_profile.map((style) => {
        let ss = ALL_STYLES.find(s => s.id === style.id);
        const s = {
          ...ss,
          price_in_coin: style.price_in_coin,
          price_in_stars: style.price_in_stars,
        };
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
                  <Button className="me-3" variant="small" onClick={() => buyItem(s, notify)}>
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