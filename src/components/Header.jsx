import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './UI/Button/Button.jsx';
import AccordionDropdown from './UI/AccordionDropdown/AccordionDropdown.jsx';

function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const tabsLineRef = useRef(null);
  const tabRefs = useRef({});
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(true); // Здесь нужно подставить актуальное состояние авторизации
  const [isTabValid,setIsTabValid] = useState(true);
  const navigate = useNavigate();
  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { name: "Проект", path: "/project/1", id: "project" },
    { name: "Все проекты", path: "/projects", id: "projects" },
    { name: "Карта", path: "/map", id: "map" },
    { name: "Рейтинг", path: "/rating", id: "rating" },
    { name: "Магазин", path: "/shop", id: "shop" },
  ];

  useEffect(() => {
    console.log(tabs.some((tab) => tab.path === location.pathname))
    setIsTabValid(tabs.some((tab) => tab.path === location.pathname));
    const activeTabFromRoute = tabs.find(tab => tab.path === location.pathname);
    if (activeTabFromRoute) {
      setActiveTab(activeTabFromRoute.id);
    }
  }, [location.pathname]);

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
  }, [activeTab]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  }

  console.log(activeTab)
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

                  <span>USERNAME</span>

                  <AccordionDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className="header-user-dropdown">
                    <div className='header-user__info'>
                    <span>500 <img src="images/money.png" alt="" /></span>
                    <span>5 <img src="images/star.svg" alt="" /></span>
                    </div>
                    <Button onClick={() => navigate('/profile')}>Профиль</Button>
                    <Button onClick={() => setIsAuth(false)}>Выход</Button>
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
