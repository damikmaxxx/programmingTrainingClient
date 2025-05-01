import React, { createContext, useState, useContext, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './Tabs.module.css';

// Контекст для управления активной вкладкой
const TabContext = createContext();

const Tabs = forwardRef(({
  tabs = [], 
  defaultActiveTab = tabs[0]?.id, 
  children, 
  onTabChange, 
  activeTab: controlledActiveTab, // Внешний activeTab
  setActiveTab: setControlledActiveTab // Внешний setActiveTab
}, ref) => {
  // Используем внутреннее состояние, только если внешнее не предоставлено
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab);
  
  // Определяем, управляется ли компонент извне
  const isControlled = controlledActiveTab !== undefined && setControlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
  const setActiveTab = isControlled ? setControlledActiveTab : setInternalActiveTab;

  // Экспортируем метод для смены активной вкладки через ref
  useImperativeHandle(ref, () => ({
    setTab: (tabId) => {
      setActiveTab(tabId);
      if (onTabChange) {
        onTabChange(tabId); // Вызываем callback, если он есть
      }
    }
  }), [setActiveTab, onTabChange]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, onTabChange }}>
      {children}
    </TabContext.Provider>
  );
});

const TabHeader = ({ tabs }) => {
  const { activeTab, setActiveTab, onTabChange } = useContext(TabContext);
  const activeTabRef = useRef(null);
  const tabsLineRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && tabsLineRef.current) {
      tabsLineRef.current.style.left = `${activeTabRef.current.offsetLeft}px`;
      tabsLineRef.current.style.width = `${activeTabRef.current.offsetWidth}px`;
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // Устанавливаем новую активную вкладку
    if (onTabChange) {
      onTabChange(tabId); // Вызываем функцию обратного вызова
    }
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => handleTabClick(tab.id)}
          ref={activeTab === tab.id ? activeTabRef : null}
        >
          {tab.label}
        </div>
      ))}
      <div className={styles.tabsLine} ref={tabsLineRef}></div>
    </div>
  );
};

const Tab = ({ id, children }) => {
  const { activeTab } = useContext(TabContext);
  return activeTab === id ? <div>{children}</div> : null;
};

export default Tabs;
export { Tab, TabHeader };