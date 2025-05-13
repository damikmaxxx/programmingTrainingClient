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
import { useLocation, useNavigate } from 'react-router-dom';

const Map = () => {
  const location = useLocation();
  const { mapProjects, setMapProjects } = useProjectsStore();
  const navigate = useNavigate();
  const { role } = useUserStore();
  const { domElements, domConnection, setMapData } = useMapStore();
  const [readyProjects, setReadyProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [focusProjectId, setFocusProjectId] = useState(null);
  const [mapController, setMapController] = useState(null);
  const [isAdmin] = useState(role === "admin");
  const [displayMode, setDisplayMode] = useState(location.pathname === "/map/admin" ? "admin" : "user");
  const [mapMode, setMapMode] = useState(location.pathname === "/map/admin" ? "admin" : "user");
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [activeElement, setActiveElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectInfo, setActiveProjectInfo] = useState({
    id: 0,
    name: "",
    description: "",
    experience: 0,
    coins: 0,
  });
  const [OPENED_MAP_PROJECTS,SET_OPENED_MAP_PROJECTS] = useState([
    {id:20,projects_id:[16,17,18,19,20],open:false}, 
  ])
  useEffect(() => {
    async function fetchData() {
      console.log("Запрос данных...");
      try {
        const projects = await projectAPI.getProjects();
        const filteredProjects = projects.filter(project => project.is_limited === false);

        const purchasedMaps = JSON.parse(localStorage.getItem('purchasedMaps') || '[]');
        SET_OPENED_MAP_PROJECTS(OPENED_MAP_PROJECTS.map(project => ({
          ...project,
          open: purchasedMaps.includes(project.id),
        })))
        console.log("Купленные карты:", SET_OPENED_MAP_PROJECTS);
        const openedProjects = await mapAPI.getUserProjectMap();
        const connection = await mapAPI.getConnections();
        const elements = await mapAPI.getElements();
        console.log(elements, connection, openedProjects);
        const connectionF = connection
          .filter(item => item.prev_project !== null)
          .map((item, index) => ({
            id: index + 1,
            from: item.prev_project,
            to: item.project,
            params: { arrow: true, brokenLine: true },
          }));
        console.log(elements, connection, openedProjects);
        const elementsF = elements.map(item => {
          const projectData = openedProjects.find(proj => proj.project_id === item.project_id);
          return {
            id: item.project_id,
            position: { x: item.position_x, y: item.position_y },
            params: {
              draggable: true,
              isOpen: projectData ? projectData.is_open : false,
              isCompleted: projectData ? projectData.is_completed : false,
            },
          };
        });
        console.log(elementsF, connectionF, filteredProjects);
        setMapData(elementsF, connectionF);
        setMapProjects(filteredProjects);

        if (role === "admin") {
          const adminProjects = await mapAPI.getAdminListMapProject();
          setReadyProjects(adminProjects.map(p => ({
            id: p.id,
            name: p.name,
            title: p.name,
            description: "",
            experience: 0,
            coins: 0,
          })));
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const DOM_ELEMENTS_TEMPLATE = domElements.map(el => {
      const project = mapProjects.find(p => p.id === el.id);
      const name = project?.name?.length > 15 ? project.name.slice(0, 20) + '...' : project?.name;
      return {
        ...el,
        html: `<div class="map__element">${name || 'Неизвестно'}</div>`,
      };
    });
    const _DOM_ELEMENTS = document.getElementById('domelements');
    const _ACTIVE_SCREEN = document.getElementById('draggablescreen');

    const MAP_SETTINGS = { mode: mapMode };
    const DOM_CONTROLLER = new DOM_ELEMENTS_CONTROLLER(DOM_ELEMENTS_TEMPLATE, domConnection,{opened_map_projects: OPENED_MAP_PROJECTS});
    const map_controller = new MAP_CONTROLLER(MAP_SETTINGS, DOM_CONTROLLER, _DOM_ELEMENTS, _ACTIVE_SCREEN);
    map_controller.init();
    map_controller.subcribeUpdateElements((snapshotEl) => {
      availableElements(snapshotEl.elements);
      setMapData(snapshotEl.elements, snapshotEl.connection);
    });
    setMapController(map_controller);

    return () => map_controller.destroy?.();
  }, [isLoading]);

  useEffect(() => {
    const container = document.getElementById('domelements');
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      let stopCheck = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('element_close')) return;

          if (target.classList.contains('active__element')) {
            const rect = target.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            setElementPosition({ x: rect.left + scrollX, y: rect.top + scrollY });
            setActiveElement(target.id);

            const focusId = getIdFromDomElement(target);
            const focusProject = mapProjects.find(el => el.id === focusId);
            if (focusProject) {
              setActiveProjectInfo({
                id: focusProject.id,
                name: focusProject.name,
                description: focusProject.description,
                experience: focusProject.experience,
                coins: focusProject.coins,
              });
            }
            stopCheck = true;
          } else if (!target.classList.contains('active__element') && !stopCheck) {
            setActiveElement(null);
            setElementPosition({ x: 0, y: 0 });
          }
        }
      });
    });

    observer.observe(container, { attributes: true, attributeFilter: ['class'], subtree: true });
    return () => observer.disconnect();
  }, [isLoading]);

  const availableElements = async (elements) => {
    if (role !== "admin") return;

    try {
      const adminProjects = await mapAPI.getAdminListMapProject();
      const onMap = elements.map(el => el.id);
      setReadyProjects(adminProjects
        .filter(p => !onMap.includes(p.id))
        .map(p => ({
          id: p.id,
          name: p.name,
          title: p.name,
          description: "",
          experience: 0,
          coins: 0,
        })));
      console.log(adminProjects);
    } catch (error) {
      console.error("Ошибка при обновлении списка незанятых проектов:", error);
    }
  };

  const addNewProject = (event) => {
    const container = document.getElementById("draggablescreen");
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const objElement = {
      id: activeProject.id,
      html: `<div class="map__element">${activeProject.name || activeProject.title}</div>`,
      position: { x, y },
      params: { draggable: true },
    };

    mapController.addNewElement(objElement);
    setReadyProjects(prev => prev.filter(project => project.id !== activeProject.id));
    setActiveProject(null);
  };

  const saveMap = async () => {
    if (mapMode !== "admin") return;

    const snapshot = mapController.getMap();

    const projectsToSave = [];
    // 1. Добавим все связи
    const toSet = new Set(snapshot.connections.map(conn => conn.to));
    snapshot.connections.forEach(conn => {
      const targetElement = snapshot.elements.find(el => el.id === conn.to);
      if (!targetElement) return;

      projectsToSave.push({
        project_id: conn.to,
        prev_project_id: conn.from,
        position_x: Math.round(targetElement.position.x),
        position_y: Math.round(targetElement.position.y),
      });
    });

    // 2. Добавим элементы, в которые никто не ведёт
    snapshot.elements.forEach(el => {
      if (!toSet.has(el.id)) {
        projectsToSave.push({
          project_id: el.id,
          prev_project_id: null,
          position_x: Math.round(el.position.x),
          position_y: Math.round(el.position.y),
        });
      }
    });
    // const projectsToSave = snapshot.elements.map((el, idx) => ({
    //   project_id: el.id,
    //   prev_project_id: snapshot.connections.find(conn => conn.to === el.id)?.from || null,
    //   position_x: Math.round(el.position.x),
    //   position_y: Math.round(el.position.y),
    // }));
    console.log(projectsToSave);
    try {
      const result = await mapAPI.saveMapPositions(projectsToSave);
      console.log("Карта сохранена:", result);
      const updatedElements = await mapAPI.getElements();
      const elementsF = updatedElements.map(item => ({
        id: item.project_id,
        position: { x: item.position_x, y: item.position_y },
        params: { draggable: true },
      }));
      // setMapData(elementsF, snapshot.connection);
      // await availableElements(elementsF);
    } catch (error) {
      console.error("Ошибка сохранения карты:", error);
    }
  };

  // Функция переключения режима отображения

  const toggleDisplayMode = () => {
    if (!isAdmin) return;

    const isCurrentlyAdmin = location.pathname.includes('/map/admin');

    const newPath = isCurrentlyAdmin ? '/map' : '/map/admin';
    navigate(newPath);
  };

  const ProjectInfo = () => (
    <div className={styles.projectInfo}>
      <h3>{activeProjectInfo.name}</h3>
      <p>{activeProjectInfo.description}</p>
      <div className={styles.projectInfo_footer}>
        <span className={styles.projectInfo_items}>
          <ItemCounter type="coin" count={activeProjectInfo.coins} />
          <ItemCounter type="exp" count={activeProjectInfo.experience} />
        </span>
        <Button onClick={() => navigate(`/project/${activeProjectInfo.id}`)} variant='small'>
          Перейти
        </Button>
      </div>
    </div>
  );

  return (
    <main className="main--map">
      <div className={styles.fixedElement}>
        <Tooltip id="active-element" place="bottom" clickable>
          <ProjectInfo />
        </Tooltip>
        <div
          className={styles.activeElement}
          data-tooltip-id="active-element"
          style={{
            left: elementPosition.x + 'px',
            top: elementPosition.y + 'px',
            display: activeElement == null ? "none" : "block",
          }}
        ></div>
      </div>
      <div id="draggablescreen">
        {activeProject && (
          <div onClick={addNewProject} className={styles.createObjectScreen}></div>
        )}
        <div id="domelements"></div>
      </div>
      {isAdmin && (
        <button
          className="changeDisplayMode btn btn-light"
          id="changeAccessButton"
          onClick={toggleDisplayMode}
        >
          {displayMode === "admin" ? "Перейти в режим пользователя" : "Перейти в режим админа"}
        </button>
      )}
      {displayMode === "admin" && (
        <div className="toolspanel text-center" id="toolspanel">
          <h5>ПАНЕЛЬ РЕДАКТИРОВАНИЯ</h5>
          <button className="editbutton btn btn-light" id="editButton">
            РЕДАКТИРОВАТЬ
          </button>

          <div className="d-flex justify-content-around align-items-center mb-2 createBlock">
            {/* <p>Режим создания элемента</p>
            <input type="checkbox" id="toggleCreateBlock" /> */}
          </div>
          <div className="project-list">
            {readyProjects?.map((project) => (
              <div
                onClick={() => setActiveProject(project)}
                key={project.id}
                className={`${styles.toolspanel__map__element} ${activeProject?.id === project.id ? styles.toolspanel__active : ""
                  }`}
              >
                id:{project.id}, title: {project.name || project.title}
              </div>
            ))}
          </div>
          <button onClick={saveMap} className="btn btn-success btn-lg fw-bold text-uppercase">
            Сохранить карту
          </button>
        </div>
      )}
    </main>
  );
};

export default Map;

export function MapWrapper() {
  const location = useLocation();

  return <Map key={location.pathname} />;
}