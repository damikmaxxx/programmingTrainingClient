import React from 'react';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Select from '../components/UI/Select/Select';
import { Link } from 'react-router-dom';
import { useProjectsStore } from '../store/store.js';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';

const Projects = () => {
  const { temporaryProjects, startedProjects, completedProjects } = useProjectsStore();

  const tabs = [
    { id: 'additional', label: 'Временные' },
    { id: 'started', label: 'Начатые' },
    { id: 'finished', label: 'Завершенные' },
  ];

  const sortedModes = [
    { value: "time", label: "по Времени" },
    { value: "level", label: "по Уровню" },
  ];



  return (
    <main className="main--dark">
      <section id="projects">
        <div className="container">
          <div className="row">

            <Tabs tabs={tabs} defaultActiveTab="additional">
              <div className="col-lg-8  tabs  projects__tabs">          <TabHeader tabs={tabs} /></div>
              <div className="col-lg-1"></div>
              <div className="col-lg-3 projects__tabs projects__tabs--sort">
                <h6>Сортировка</h6>
                <div className='select'>
                  <Select options={sortedModes} defaultValue='По умолчанию' placeholder='Выбери сортировку' />
                </div>
              </div>
              <Tab id="additional" key={"additional"}>
                <div className="row tab-content">
                  {temporaryProjects
                    .map((project) => (
                      <div className="col-lg-4" key={project.id}>
                        <div className="projects__project">
                          <Link to={"/project/" + project.id}></Link>
                          <span className="projects__project__time">
                            <img src="images/clock.svg" alt="" /> {project.time}
                          </span>
                          <h5>{project.title}</h5>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                            <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.exp} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.money} />
                            </div>
                          </div>
                        </div>
                      </div>

                    ))}
                </div>
              </Tab>

              <Tab id="started" key={"started"}>
                <div className="row tab-content">
                  {startedProjects
                    .map((project) => (

                      <div className="col-lg-4" key={project.id}>
                        <div className="projects__project">
                          <a href="#"></a>
                          <span className="projects__project__level-access">{project.level}</span>
                          <span className="projects__project__time">
                            <img src="images/clock.svg" alt="" /> {project.time}
                          </span>
                          <h5>{project.title}</h5>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                          <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.exp} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.money} />
                            </div>
                          </div>
                          <div className="projects__project__lock">
                            <img src="images/lock.svg" alt="" /> <span>НУЖЕН УРОВЕНЬ</span>
                          </div>
                        </div>
                      </div>

                    ))}
                </div>
              </Tab>

              <Tab id="finished" key={"finished"}>
                <div className="row tab-content">
                  {completedProjects
                    .map((project) => (

                      <div className="col-lg-4" key={project.id}>
                        <div className="projects__project">
                          <a href="#"></a>
                          <span className="projects__project__level-access">{project.level}</span>
                          <span className="projects__project__stars projects__project__stars--1">
                            <img src="images/star.svg" alt="" />{project.stars}</span>
                          <h5>{project.title}</h5>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                          <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.exp} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.money} />
                            </div>
                          </div>
                          <div className="projects__project__lock">
                            <img src="images/lock.svg" alt="" /> <span>НУЖЕН УРОВЕНЬ</span>
                          </div>
                        </div>
                      </div>

                    ))}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
