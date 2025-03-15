import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './UI/Button/Button.jsx';
import AccordionDropdown from './UI/AccordionDropdown/AccordionDropdown.jsx';
import { useUserStore } from '../store/store.js';
import ItemCounter from './Shared/ItemCounter/ItemCounter.jsx';
function Header() {
  const [activeTab, setActiveTab] = useState("profile");
  const tabsLineRef = useRef(null);
  const tabRefs = useRef({});
  const location = useLocation();
  const [isTabValid,setIsTabValid] = useState(true);
  const navigate = useNavigate();

  const {isAuth,setAuth , name} = useUserStore();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };



  const tabs = useMemo(() => [
    { name: "Проект", path: "/project/1", id: "project" },
    { name: "Все проекты", path: "/projects", id: "projects" },
    { name: "Карта", path: "/map", id: "map" },
    { name: "Рейтинг", path: "/rating", id: "rating" },
    { name: "Магазин", path: "/shop", id: "shop" },
  ], []);



  useEffect(() => {
    setIsTabValid(tabs.some((tab) => tab.path === location.pathname));
    const activeTabFromRoute = tabs.find(tab => tab.path === location.pathname);
    if (activeTabFromRoute) {
      setActiveTab(activeTabFromRoute.id);
    }
  }, [location.pathname,tabs]);

  useEffect(() => {

    const activeTabElement = tabRefs.current[activeTab];
    const parentContainer = activeTabElement?.parentElement;

    if (activeTabElement) {
      const activeTabRect = activeTabElement.getBoundingClientRect();
      const parentRect = parentContainer.getBoundingClientRect();
      const left = activeTabRect.left - parentRect.left;
      const width = activeTabRect.width;

      if (tabsLineRef.current) {
        tabsLineRef.current.style.left = `${left}px`;
        tabsLineRef.current.style.width = `${width}px`;
      }
    }
  }, [activeTab,tabs]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header>
      <div className="container">
        <div className="row header-row">
          <div className="col-lg-2 logo">
            <Link to="/">Questify</Link>
          </div>
          <nav className="col-lg-7 nav">
            <ul className={`tabs header__tab ${isTabValid ? "" : "tabs-unactive"}`}>
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                >
                  <Link to={tab.path}>{tab.name}</Link>
                </li>
              ))}
              <div ref={tabsLineRef} className={`tabs-line`}/>
            </ul>
          </nav>
          <div className="col-lg-3">
            {!isAuth ? (
              <div className='header-auth'>
                <Button onClick={() => navigate('/login')}>Вход</Button>
                <Button onClick={() => navigate('/registration')}>Регистрация</Button>
              </div>
            ) : (
              <>
                <div onClick={() => toggleAccordion()} className='header-user'>
                  <span className='header-avatar'><img src="https://www.gravatar.com/avatar/?d=mp" alt="аватарка" /></span>

                  <span>{name}</span>

                  <AccordionDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className="header-user-dropdown">
                    <div className='header-user__info'>
                    <ItemCounter type="coin"/>
                    <ItemCounter type="star"/>
                    </div>

                    <Button onClick={() => navigate('/profile')}>Профиль</Button>
                    <Button onClick={() => setAuth(false)}>Выход</Button>
                    </div>
                  </AccordionDropdown>
                </div>

              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
