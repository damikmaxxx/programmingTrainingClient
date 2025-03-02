import React, { useEffect, useState } from 'react';
import '../styles/map.css';
import { MAP_CONTROLLER } from '../utils/map/map_controller';
import { DOM_ELEMENTS_CONTROLLER } from '../utils/map/dom_elements_controller';
import styles from './Map.module.css';
import { useProjectsStore,useMapStore } from '../store/store';
const Map = () => {
  const { mapProjects, } = useProjectsStore()
  const { domElements,domConnection,setMapData } = useMapStore()
  const [readyProjects, setReadyProjects] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [mapController, setMapController] = useState(null)
  useEffect(() => {
    const DOM_ELEMENTS_TEMPLATE = domElements.map(el => {
      const project = mapProjects.find(p => p.id === el.id)
      if (project.title.length > 15) {
        project.title = project.title.slice(0, 20) + '...';
      }
      return {
        ...el,
        html: project
          ? `<div class="${styles.map__element}">${project.title}</div>`
          : `<div class="${styles.map__element}">...</div>`,
      };
    })
    const onMap = DOM_ELEMENTS_TEMPLATE.map(el => el.id);
    setReadyProjects(mapProjects.filter(p => !onMap.includes(p.id)));

    const _DOM_ELEMENTS = document.getElementById('domelements');
    const _ACTIVE_SCREEN = document.getElementById('draggablescreen');

    const MAP_SETTINGS = {};
    const DOM_CONTROLLER = new DOM_ELEMENTS_CONTROLLER(DOM_ELEMENTS_TEMPLATE, domConnection);
    const map_controller = new MAP_CONTROLLER(MAP_SETTINGS, DOM_CONTROLLER, _DOM_ELEMENTS, _ACTIVE_SCREEN);
    map_controller.init()
    map_controller.subcribeUpdateElements((snapshotEl) => {
      availableElements(snapshotEl.elements)
      setMapData(snapshotEl.elements,snapshotEl.connection)
    })
    setMapController(map_controller);
    


  }, []);
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
  return (
    <main className="main--map">
      <div id="draggablescreen">
        {activeProject ? <div onClick={(event) => addNewProject(event)} className={styles.createObjectScreen}></div> : <></>}
        <div id="domelements">

        </div>

      </div>
      <div className="toolspanel text-center" id="toolspanel">
        <h5>ПАНЕЛЬ РЕДАКТИРОВАНИЯ</h5>
        <button className="editbutton btn btn-light" id="editButton">
          Редактировать
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
    </main>
  );
};

export default Map;
