import React, { useEffect } from 'react';

function Profile() {
  useEffect(() => {
    // Здесь будет ваш код для работы с canvas, например, рисование диаграмм
    const skillsCanvas = document.getElementById("skills_diagram");
    const expCanvas = document.getElementById("exp_diagram");
    
    // Пример для работы с canvas
    if (skillsCanvas && expCanvas) {
      // Настройка диаграмм или других элементов, использующих canvas
    }
  }, []); // Пустой массив, чтобы код сработал только при монтировании компонента

  return (
    <section id="profile">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="profile__block">
              <div className="profile__block__section">
                <div className="profile__logo">
                  <div className="profile__logo_img">
                    <img src="images/free-icon-user-1077063.png" alt="" />
                  </div>
                  <div className="profile__logo__says">I use Arch, btw!</div>
                </div>
              </div>

              <div className="profile__block__section d-flex justify-content-between align-items-center">
                <h5>Majorswe</h5>
                <div className="profile__status online">online</div>
              </div>

              <div className="profile__block__section">
                <div className="profile__level__text d-flex justify-content-between">
                  <span>Уровень 0</span>
                  <span>70%</span>
                </div>
                <div className="profile__level__progressbar">
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>

              <div className="profile__block__section d-flex justify-content-between align-items-center">
                <h5>Очки</h5>
                <div className="profile__element profile__element__exp">
                  <span className="profile__element__num">300</span>
                  <span>exp</span>
                </div>
                <div className="profile__element profile__element__rpr">
                  <span className="profile__element__num">300</span>
                  <span>RPR</span>
                </div>
                <div className="profile__element profile__element__gold">
                  <span className="profile__element__num">300</span>
                  <span>gold</span>
                </div>
              </div>

              <div className="profile__block__section">
                <h5>
                  Отзывы Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h5>
              </div>

              <div className="profile__block__section text-center connections">
                <h5>
                  <a href="mailto:majorswe@mail.com">majorswe@mail.com</a>
                </h5>
                <h5>
                  <a href="https://github.com/">GitHub</a>
                </h5>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="profile__side">
              <div className="profile__block text-center">
                <div className="row">
                  <div className="col-lg-7 profile__block__left">
                    <h3>Навыки</h3>
                    <div className="profile__skills">
                      <div className="profile__skills__canvas">
                        <canvas id="skills_diagram"></canvas>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <h3>Проекты</h3>
                    <ul className="profile__projects">
                      <li className="profile__project profile__project-positiv">
                        <a href="#">ПРОЕКТ1</a>
                      </li>
                      <li className="profile__project profile__project-positiv">
                        <a href="#">ПРОЕКТ2</a>
                      </li>
                      <li className="profile__project profile__project-negativ">
                        <a href="#">ПРОЕКТ3</a>
                      </li>
                      <li className="profile__project profile__project-negativ">
                        <a href="#">ПРОЕКТ4</a>
                      </li>
                      <li className="profile__project profile__project-positiv">
                        <a href="#">ПРОЕКТ5</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="profile__block text-center">
                <h3>опыт</h3>
                <div className="profile__exp">
                  <div className="profile__exp__canvas">
                    <canvas id="exp_diagram"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
