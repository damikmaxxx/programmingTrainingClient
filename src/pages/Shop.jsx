import React from 'react';
import styles from './Shop.module.css';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Button from '../components/UI/Button/Button';
import "../styles/nicknameStyles.css";
import { nicknameStyles } from '../data/nicknameStyles.js';
import Select from '../components/UI/Select/Select.jsx';
const Shop = () => {
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
      id: ' other',
      label: 'Другое',
    },
  ];

  const buyItem = (item) => {
    console.log(item);
  }
  const sortedModes = [
    { value: "price", label: "По цене" },
    { value: "popular", label: "По популярности" },
    { value: "time", label: "По времени" },
  ];
  console.log(styles)
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
              <Select  options={sortedModes} defaultValue='По умолчанию' placeholder='Выбери сортировку' />
            </div>
          </div>
        </div>
        <Tab id="styleNames">
          <div className="row">
            {nicknameStyles.map((style) => (
              <div key={style.id} className="col-4">
                <div className={styles.shopItem + " dark-primary-color"}>
                <div className={styles.shopItemName}> <span className={style.className || ""}>USER NAME</span> </div>
                <div>
                    <h4>{style.name}</h4>
                    <div className={styles.shopItemPrice}>Цена: {style.price} <img src="images/money.png" alt="" /></div>
                    <Button variant="small" onClick={() => buyItem(style)}>КУПИТЬ</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </Tab>
        <Tab id="profileThemes">
          21
        </Tab>
        <Tab id="other">
          43242
        </Tab>
      </Tabs>

    </div>
  );
};

export default Shop;
