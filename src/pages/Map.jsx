import React, { useEffect, useState } from 'react';
import '../styles/map.css';
import { MAP_CONTROLLER } from '../utils/map/map_controller';
import { DOM_ELEMENTS_CONTROLLER } from '../utils/map/dom_elements_controller';
import styles from './Map.module.css';
import { useProjectsStore, useMapStore, useUserStore } from '../store/store';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ItemCounter from '../components/Shared/ItemCounter/ItemCounter';
import Button from '../components/UI/Button/Button';
import { mapAPI, projectAPI } from '../api/api';
import Loader from '../components/UI/Loader/Loader';
import { getIdFromDomElement } from '../utils/map/utils';
import { useNavigate } from 'react-router-dom';
const Map = () => {
  const { mapProjects, setMapProjects } = useProjectsStore()
  const navigate = useNavigate();
  const { role } = useUserStore()
  const { domElements, domConnection, setMapData } = useMapStore()
  const [readyProjects, setReadyProjects] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [focusProjectId, setFocusProjectId] = useState(null)
  const [mapController, setMapController] = useState(null)
  const [mapMode, setMapMode] = useState(role)
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 }); // Состояние для координат
  const [activeElement, setActiveElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectInfo, setActiveprojectInfo] = useState({
    id: 0,
    name: "", description: "", experience: 0,
    coins: 0,
  });


  useEffect(() => {
    async function fetchData() {
      console.log("Запрос данных...");

      try {
        const projects = await projectAPI.getProjects();
        const filteredProjects = projects.filter(project => project.is_limited === false);

        console.log("Фильтрованные проекты:", projects);

        const openedProjects = await mapAPI.getUserProjectMap();
        const connection = await mapAPI.getConnections();
        console.log(openedProjects);

        const connectionF = connection
          .filter(item => item.prev_project !== null)
          .map((item, index) => ({
            id: index + 1, // ID соединения
            from: item.prev_project, // Откуда
            to: item.project, // Куда
            params: { arrow: true, brokenLine: true } // Общие параметры
          }));

        const elements = await mapAPI.getElements();
        const elementsF = elements.map(item => {
          const projectData = openedProjects.find(proj => proj.project_id === item.project_id);

          return {
            id: item.project_id, // ID элемента
            position: {
              x: item.position_x,
              y: item.position_y
            },
            params: {
              draggable: true,
              isOpen: projectData ? projectData.is_open : false,
              isCompleted: projectData ? projectData.is_completed : false
            }
          };
        });

        console.log("---", connection, connectionF, elementsF);
        setMapData(elementsF, connectionF);
        setMapProjects(filteredProjects);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }

    fetchData();

  }, []);

  useEffect(() => {
    if (isLoading) return
    const DOM_ELEMENTS_TEMPLATE = domElements.map(el => {
      const project = mapProjects.find(p => p.id === el.id)
      if (project.name.length > 15) {
        project.name = project.name.slice(0, 20) + '...';
      }
      return {
        ...el,
        html: `<div class="map__element">${project.name}</div>`
      };
    })
    const onMap = DOM_ELEMENTS_TEMPLATE.map(el => el.id);
    setReadyProjects(mapProjects.filter(p => !onMap.includes(p.id)));

    const _DOM_ELEMENTS = document.getElementById('domelements');
    const _ACTIVE_SCREEN = document.getElementById('draggablescreen');

    const MAP_SETTINGS = {
      mode: mapMode,
    };
    const DOM_CONTROLLER = new DOM_ELEMENTS_CONTROLLER(DOM_ELEMENTS_TEMPLATE, domConnection);
    const map_controller = new MAP_CONTROLLER(MAP_SETTINGS, DOM_CONTROLLER, _DOM_ELEMENTS, _ACTIVE_SCREEN);
    map_controller.init()
    map_controller.subcribeUpdateElements((snapshotEl) => {
      availableElements(snapshotEl.elements)
      setMapData(snapshotEl.elements, snapshotEl.connection)
    })
    setMapController(map_controller);



  }, [isLoading]);
  useEffect(() => {
    const container = document.getElementById('domelements');
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      let stopCheck = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;

          if (target.classList.contains('element_close')) {
            return; // Пропускаем элементы с классом element_close
          }

          if (target.classList.contains('active__element')) {
            const rect = target.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            console.log(scrollX, scrollY, rect);

            setElementPosition({
              x: rect.left + scrollX,
              y: rect.top + scrollY,
            });

            setActiveElement(target.id);
            const focusId = getIdFromDomElement(target);
            const focusProject = mapProjects.find(el => el.id === focusId);

            if (focusProject) {
              setActiveprojectInfo({
                id: focusProject.id,
                name: focusProject.name,
                description: focusProject.description,
                experience: focusProject.experience,
                coins: focusProject.coins,
              });
            }

            stopCheck = true;
          } else if (!target.classList.contains('active__element') && !stopCheck) {
            console.log(target);
            setActiveElement(null);
            setElementPosition({ x: 0, y: 0 });
          }
        }
      });
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });

    return () => observer.disconnect();
  }, [isLoading]);


  const availableElements = (elements) => {
    const onMap = elements.map(el => el.id);
    setReadyProjects(mapProjects.filter(p => !onMap.includes(p.id)));
  }
  const getMap = () => {
    console.log(mapController.getMap());
  }

  const addNewProject = (event) => {
    const container = document.getElementById("draggablescreen");
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let objElement = {
      id: activeProject.id,
      html: `<div class="map__element">${activeProject.title}</div>`,
      position: {
        x: x,
        y: y,
      },
      params: { draggable: true },
    };


    mapController.addNewElement(objElement)
    setReadyProjects(prevProjects =>
      prevProjects.filter(project => project.id !== activeProject.id)
    );
    setActiveProject(null)
  }


  const ProjectInfo = () => {
    console.log(activeProjectInfo)
    return (
      <div className={styles.projectInfo}>
        <h3>{activeProjectInfo.name}</h3>
        <p>{activeProjectInfo.description}</p>
        <div className={styles.projectInfo_footer}>
          <span className={styles.projectInfo_items}>
            <ItemCounter type="coin" count={activeProjectInfo.coins} />
            <ItemCounter type="exp" count={activeProjectInfo.experience} />
          </span>
          <Button 
            onClick={() => navigate(`/project/${activeProjectInfo.id}`)} // Переход на страницу проекта
            variant='small'
          >
            Перейти
          </Button>
        </div>

      </div>
    );
  };


  useEffect(() => {
    console.log(mapProjects.length, domElements.length, domConnection.length)
    if (mapProjects.length > 0 && domElements.length > 0 && domConnection.length > 0) {

      setIsLoading(false)
    }
  }, [mapProjects]);

  if (isLoading) return <Loader />;
  return (
    <main className="main--map">
      <div className={styles.fixedElement}>
        <Tooltip
          id="active-element"
          place="bottom"
          clickable
        >
          <ProjectInfo />
        </Tooltip>

        <div
          className={styles.activeElement}
          data-tooltip-id="active-element"
          style={{
            left: elementPosition.x + 'px',
            top: elementPosition.y + 'px',
            display: activeElement == null ? "none" : "block"
          }}
        ></div>
      </div>
      <div id="draggablescreen">
        {activeProject ? <div onClick={(event) => addNewProject(event)} className={styles.createObjectScreen}></div> : <></>}
        <div id="domelements">

        </div>

      </div>

      {mapMode === "admin" ?
        <div className="toolspanel text-center" id="toolspanel">

          <h5 data-tooltip-id="my-tooltip">ПАНЕЛЬ РЕДАКТИРОВАНИЯ</h5>
          <button className="editbutton btn btn-light" id="editButton">
            РЕДАКТИРОВАТЬ
          </button>
          <div className="d-flex justify-content-around align-items-center mb-2 createBlock">
            <p>Режим создания элемента</p>
            <input type="checkbox" id="toggleCreateBlock" />
          </div>
          {/* <textarea
          id="createBlockTextArea"
          className="createBlock__textarea"
          placeholder="Введите код блока"
          defaultValue="..."
        >
        </textarea> */}
          <div className="project-list">
            {readyProjects?.map((project) => (
              <div onClick={() => setActiveProject(project)} key={project.id} className={`${styles.toolspanel__map__element} ${activeProject?.id === project.id ? styles.toolspanel__active : ""
                }`}>
                id:{project.id}, title {project.title}
              </div>
            ))}
          </div>
          <button onClick={getMap} className="btn btn-success  btn-lg fw-bold text-uppercase">Сохранить карту</button>
        </div>
        : <></>}


    </main>
  );
};

export default Map;
