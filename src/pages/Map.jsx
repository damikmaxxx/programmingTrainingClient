import React, { useEffect } from 'react';
import '../styles/map.css';
import { MAP_CONTROLLER } from '../utils/map/map_controller';
import { DOM_ELEMENTS_CONTROLLER } from '../utils/map/dom_elements_controller';
import { DOM_ELEMENTS, DOM_CONNECTION } from '../utils/map/map_elements';

const Map = () => {
  let map_controller = null;
  useEffect(() => {
    const _DOM_ELEMENTS = document.getElementById('domelements');
    const _ACTIVE_SCREEN = document.getElementById('draggablescreen');

    const MAP_SETTINGS = {};
    const DOM_CONTROLLER = new DOM_ELEMENTS_CONTROLLER(DOM_ELEMENTS, DOM_CONNECTION);
    map_controller = new MAP_CONTROLLER(MAP_SETTINGS, DOM_CONTROLLER, _DOM_ELEMENTS, _ACTIVE_SCREEN);
    map_controller.init();
    


  }, []);

  const getMap = () => {
    console.log(map_controller.getMap());
  }

  return (
    <main className="main--map">
      <div id="draggablescreen">
        <div id="domelements"></div>
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
        <textarea
          id="createBlockTextArea"
          className="createBlock__textarea"
          placeholder="Введите код блока"
          defaultValue="..."
        >
        </textarea>
        <button onClick={getMap} className="btn btn-success  btn-lg fw-bold text-uppercase">Сохранить карту</button>

      </div>
    </main>
  );
};

export default Map;
