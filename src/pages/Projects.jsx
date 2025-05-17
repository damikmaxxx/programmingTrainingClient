import React, { useState } from 'react';
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import Select from '../components/UI/Select/Select';
import { Link } from 'react-router-dom';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter.jsx';
import { projectAPI } from '../api/api.js';
import Loader from '../components/UI/Loader/Loader.jsx';
import useProjects from '../hooks/useProjects.js';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('additional');

  const tabs = [
    { id: 'additional', label: 'Временные' },
    { id: 'started', label: 'Начатые' },
    { id: 'finished', label: 'Завершенные' },
  ];

  const sortedModes = [
    { value: "time", label: "по Времени" },
    { value: "level", label: "по Уровню" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Функция для извлечения только дней из time_remaining
  const getShortTime = (timeRemaining) => {
    if (!timeRemaining) return '';
    const match = timeRemaining.match(/^(\d+)д/);
    return match ? `${match[1]}д` : timeRemaining;
  };

  const { isLoading, temporaryProjects, startedProjects, completedProjects } = useProjects(projectAPI, activeTab);

  return (
    <main className="main--dark">
      <section id="projects">
        <div className="container">
          <div className="row">
            <Tabs tabs={tabs} defaultActiveTab="additional" onTabChange={handleTabChange}>
            <div className="col-lg-2"></div>
              <div className="col-lg-8 tabs projects__tabs">
                <TabHeader tabs={tabs} />
              </div>
              <div className="col-lg-1"></div>
              {/* <div className="col-lg-3 projects__tabs projects__tabs--sort">
                <h6>Сортировка</h6>
                <div className="select">
                  <Select options={sortedModes} defaultValue="По умолчанию" placeholder="Выбери сортировку" />
                </div>
              </div> */}
              <Tab id="additional" key="additional">
                <div className="row tab-content">
                  {isLoading ? (
                    <Loader fullPage={false} />
                  ) : (
                    temporaryProjects.map((project) => (
                      <div className="col-lg-4" key={project.project_id}>
                        <div className="projects__project">
                          <Link to={`/project/${project.project_id}`} />
                          <span
                            className="projects__project__time"
                            data-tooltip-id={`time-tooltip-${project.project_id}`}
                            data-tooltip-content={project.time_remaining}
                          >
                            <img src="images/clock.svg" alt="" /> {getShortTime(project.time_remaining)}
                          </span>
                          <Tooltip id={`time-tooltip-${project.project_id}`} />
                          <h3>{project.name}</h3>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                            <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.experience} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.coins} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Tab>
              <Tab id="started" key="started">
                <div className="row tab-content">
                  {isLoading ? (
                    <Loader fullPage={false} />
                  ) : (
                    startedProjects.map((project) => (
                      <div className="col-lg-4" key={project.project_id}>
                        <div className="projects__project">
                          <Link to={`/project/${project.project_id}`} />
                          <h3>{project.name}</h3>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                            <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.experience} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.coins} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Tab>
              <Tab id="finished" key="finished">
                <div className="row tab-content">
                  {isLoading ? (
                    <Loader fullPage={false} />
                  ) : (
                    completedProjects.map((project) => (
                      <div className="col-lg-4" key={project.project_id}>
                        <div className="projects__project">
                          <Link to={`/project/${project.project_id}`} />
                          <span className="projects__project__stars projects__project__stars--1">
                            <img src="images/star.svg" alt="" />{project.earned_stars}
                          </span>
                          <h3>{project.name}</h3>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                            <div className="projects__project__exp">
                              <ItemCounter type="exp" count={project.experience} />
                            </div>
                            <div className="projects__project__money">
                              <ItemCounter type="coin" count={project.coins} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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