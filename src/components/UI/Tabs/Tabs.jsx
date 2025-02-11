import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import styles from './Tabs.module.css';

// Контекст для управления активной вкладкой
const TabContext = createContext();

const Tabs = ({ tabs = [], defaultActiveTab = tabs[0]?.id, children }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
    </TabContext.Provider>
  );
};

const TabHeader = ({ tabs }) => {
  console.log(tabs);
  const { activeTab, setActiveTab } = useContext(TabContext);
  const activeTabRef = useRef(null);
  const tabsLineRef = useRef(null);
  useEffect(() => {
    if (activeTabRef.current && tabsLineRef.current) {
      tabsLineRef.current.style.left = `${activeTabRef.current.offsetLeft}px`;
      tabsLineRef.current.style.width = `${activeTabRef.current.offsetWidth}px`;
    }
  }, [activeTab]);
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => setActiveTab(tab.id)}
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
