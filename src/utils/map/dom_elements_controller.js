import { searchElementsById, getIdFromDomElement } from "./utils.js";

export class DOM_ELEMENTS_CONTROLLER {
  constructor(elements, connections) {
    this.elements = elements;
    this.connections = connections;
    this.dragging_mode = false;
    this.editing_mode = false;
    this.lineCreateConnection = { active: false, line: null };
    this.useDOM = null;
    this.MODE_SETTINGS = null;
    this.startConnectionEl = null;
    this.SUBSCRIBERS_TO_UPDATE_ELEMENTS = [];
    this.MAP_SETTINGS = {};
  }
  init() {
    if (this.MAP_SETTINGS.mode === this.MODE_HANDLER.CONSTANTS.USER) {
      this.initClick();
    } else {
      this.initDrag();
    }

    this.create();

    this.modeSubscribers(() => {
      this.update();
    }, [
      this.MODE_HANDLER.CONSTANTS.DEFAULT,
      this.MODE_HANDLER.CONSTANTS.EDITING,
    ]);
  }
  createElement(el) {
    console.log(el);
    let tempDiv = document.createElement("div");

    tempDiv.innerHTML = el.html;
    let newElement = tempDiv;
    newElement.style.position = "absolute";
    newElement.style.left = el.position.x + "px";
    newElement.style.top = el.position.y + "px";
    newElement.classList.add("element");
    newElement.id = `element_${el.id}`;

    // Добавляем класс element_close, если isOpen === false
    if (el.params && el.params.isOpen === false) {
      newElement.classList.add("element_close");
    }
    // Добавляем класс element_close, если isOpen === false
    if (el.params && el.params.isCompleted === true) {
      newElement.classList.add("element_completed");
    }

    this.useDOM("elements").appendChild(newElement);
    el.width = newElement.offsetWidth;
    el.height = newElement.offsetHeight;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖";
    deleteButton.classList.add("element_delete-button");
    newElement.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      this.deleteElement(el.id);
    });

    const createLineButton = document.createElement("button");
    createLineButton.innerHTML = "L";
    createLineButton.className = "element_create-line-button";
    newElement.appendChild(createLineButton);
    createLineButton.addEventListener("click", () => {
      this.createBindingsLine(el.id);
    });
    const createBindScreen = document.createElement("div");
    createBindScreen.className = "element_bind-screen";
    newElement.appendChild(createBindScreen);
    createBindScreen.addEventListener("click", () => {
      this.finishConnection(el.id);
    });
  }
  createConnection(from, to, params) {
    if (!params) params = { arrow: true, brokenLine: true };
    const now = new Date();
    let id = now.getTime();

    this.connections.push({ id, from, to, params });
    this.update();
    console.log(this.connections);
  }

  create() {
    this.elements.forEach((el) => {
      this.createElement(el);
    });
    if(this.connections?.length === 0 || !this.connections) return;
    this.connections.forEach((con) => {
      let from = this.elements.find((el) => el.id === con.from);
      let to = this.elements.find((el) => el.id === con.to);
      this.drawConnection(from, to, con.params, con.id);
    });
  }
  update() {
    this.elements.forEach((el) => {
      this.elements = this.elements.map((el) => {
        let element = searchElementsById(el.id);
        el.position.x = Number(element.style.left.replace("px", ""));
        el.position.y = Number(element.style.top.replace("px", ""));
        if (this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.EDITING))
          searchElementsById(el.id).classList.add("element--edit");
        else searchElementsById(el.id).classList.remove("element--edit");
        return el;
      });
    });
    this.drawDeleteButtons();
    const lines = document.querySelectorAll(".line");
    lines.forEach((line) => line.remove());
    
    this.connections.forEach((con) => {
      let from = this.elements.find((el) => el.id === con.from);
      let to = this.elements.find((el) => el.id === con.to);
      this.drawConnection(from, to, con.params, con.id);
    });
  }
  drawConnection(from, to, params, id) {
    console.log(from, to, params, id);
    if(!from || !to) return;
    const x1 = from.position.x + from.width / 2;
    const y1 = from.position.y + from.height / 2;
    const x2 = to.position.x + to.width / 2;
    const y2 = to.position.y + to.height / 2;
    let adjustedX1, adjustedY1, adjustedX2, adjustedY2;

    if (params?.conectionSide) {
      // SOON
      return;
    }
    if (Math.abs(y2 - y1) < 30 || Math.abs(x2 - x1) < 100) {
      if (y2 - y1 < 30 && y2 - y1 >= -30) {
        console.log(y2, y1);
        if (x2 - x1 >= 0) {
          adjustedY1 = from.position.y + from.height / 2;
          adjustedX1 = from.position.x + from.width;
          adjustedY2 = to.position.y + to.height / 2;
          adjustedX2 = to.position.x;
          this.drawLine(
            adjustedX1,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
        if (x2 - x1 < 0) {
          adjustedY1 = from.position.y + from.height / 2;
          adjustedX1 = from.position.x;
          adjustedY2 = to.position.y + to.height / 2;
          adjustedX2 = to.position.x + to.width;
          this.drawLine(
            adjustedX1,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
      }
      if (x2 - x1 < 100 && x2 - x1 >= -100) {
        if (y2 - y1 >= 0) {
          adjustedY1 = from.position.y + from.height;
          adjustedX1 = from.position.x + from.width / 2;
          adjustedY2 = to.position.y;
          adjustedX2 = to.position.x + from.width / 2;
          this.drawLine(
            adjustedX1,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
        if (y2 - y1 < 0) {
          console.log(x2, x1);
          adjustedY1 = from.position.y;
          adjustedX1 = from.position.x + from.width / 2;
          adjustedY2 = to.position.y + from.height;
          adjustedX2 = to.position.x + from.width / 2;
          this.drawLine(
            adjustedX1,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
      }
      return;
    } else if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
      if (y2 > y1) {
        adjustedY1 = from.position.y + from.height;
        adjustedY2 = to.position.y + to.height / 2;
        if (x2 > x1) adjustedX2 = to.position.x;
        else adjustedX2 = to.position.x + to.width;
      } else {
        adjustedY1 = from.position.y;
        adjustedY2 = to.position.y + to.height / 2;
        if (x2 > x1) adjustedX2 = to.position.x;
        else adjustedX2 = to.position.x + to.width;
      }
      adjustedX1 = x1;
    } else {
      if (x2 > x1) {
        adjustedX1 = from.position.x + from.width;
        adjustedX2 = to.position.x + to.width / 2;
        if (y2 > y1) adjustedY2 = to.position.y;
        else adjustedY2 = to.position.y + to.height;
      } else {
        adjustedX1 = from.position.x;
        adjustedX2 = to.position.x + to.width / 2;
        if (y2 > y1) adjustedY2 = to.position.y;
        else adjustedY2 = to.position.y + to.height;
      }
      adjustedY1 = y1;
    }
    if (params?.brokenLine) {
      let isArrow = params.arrow;
      params.arrow = false;
      if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
        this.drawLine(
          adjustedX1,
          adjustedY1,
          adjustedX1,
          adjustedY2,
          params,
          id
        );
        params.arrow = isArrow;
        if (adjustedY2 > adjustedY1) {
          this.drawLine(
            adjustedX1,
            adjustedY2,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        } else {
          this.drawLine(
            adjustedX1,
            adjustedY2,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
      } else {
        this.drawLine(
          adjustedX1,
          adjustedY1,
          adjustedX2,
          adjustedY1,
          params,
          id
        );
        params.arrow = isArrow;
        if (adjustedX2 > adjustedX1) {
          this.drawLine(
            adjustedX2,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        } else {
          this.drawLine(
            adjustedX2,
            adjustedY1,
            adjustedX2,
            adjustedY2,
            params,
            id
          );
        }
      }
    } else {
      this.drawLine(adjustedX1, adjustedY1, adjustedX2, adjustedY2, params, id);
    }
  }
  drawLine(x1, y1, x2, y2, params = {}, id) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement("div");
    line.classList.add("line");
    if (params.arrow) line.classList.add("line_arrow");
    line.id = `line_${id}`;

    this.useDOM("elements").appendChild(line);
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    if (this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.EDITING)) {
      line.classList.add("line--delete");
      line.addEventListener("click", () => {
        this.connections = this.connections.filter(
          (connection) => connection.id !== id
        );
        this.update();
      });
    }
  }
  drawDeleteButtons() {
    this.useDOM("elements")
      .querySelectorAll(".delete_button")
      .forEach((element) => {
        element.remove();
      });
    if (!this.editing_mode) return;
  }
  createBindingsLine(id) {
    if (this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CREATING)) return;
    this.MODE_HANDLER.SET_MODE(this.MODE_HANDLER.CONSTANTS.CONNECTING);

    const element = this.elements.find((el) => el.id === id);

    let handleMouseMove = (event) => {
      const existingLine = document.getElementById("line-create-connection");
      if (!this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CONNECTING)) {
        if (existingLine) {
          existingLine.remove();
        }

        const bindScreens = document.querySelectorAll(".element_bind-screen");
        bindScreens.forEach((bindScreen) => {
          bindScreen.classList.remove("active");
        });

        this.useDOM("screen").removeEventListener("mousemove", handleMouseMove);
        return;
      }
      if (existingLine) {
        existingLine.remove();
      }
      let x2 = event.clientX;
      let y2 = event.clientY;
      let x1 = element.position.x;
      let y1 = element.position.y;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      const line = document.createElement("div");
      line.classList.add("line");
      line.classList.add("stripped-line");
      line.setAttribute("id", "line-create-connection");
      this.useDOM("elements").appendChild(line);
      line.style.width = `${length}px`;
      line.style.transform = `rotate(${angle}deg)`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;
    };
    this.useDOM("screen").addEventListener("mousemove", handleMouseMove);
    const bindScreens = document.querySelectorAll(".element_bind-screen");
    bindScreens.forEach((bindScreen) => {
      if (getIdFromDomElement(bindScreen.parentElement) !== id) {
        bindScreen.classList.add("active");
      }
    });
    this.startElementId = id;
  }
  finishConnection(id) {
    if (!this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CONNECTING))
      return;
    if (this.startElementId === id) return;
    this.createConnection(this.startElementId, id);

    this.MODE_HANDLER.SET_MODE(this.MODE_HANDLER.CONSTANTS.COMMANDS.BACK);
  }
  initClick() {
    if (this.MAP_SETTINGS.mode === this.MODE_HANDLER.CONSTANTS.ADMIN) return;
    let activeTarget;
    this.useDOM("screen").addEventListener("click", (event) => {
      if (
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CONNECTING) ||
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CREATING) ||
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.MOVING)
      )
        return;
      activeTarget = event.target.closest(".element");
      if (!activeTarget) return;
      console.log(activeTarget);
      document
        .querySelectorAll(".active__element")
        .forEach((el) => el.classList.remove("active__element"));
      // Добавляем класс active__element к текущему элементу
      activeTarget.classList.add("active__element");
    });
  }
  initDrag() {
    let offsetX, offsetY;
    let activeTarget;
    const onMouseDown = (event) => {
      if (
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CONNECTING) ||
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.CREATING) ||
        this.MODE_HANDLER.IS_MODE(this.MODE_HANDLER.CONSTANTS.MOVING)
      )
        return;
      activeTarget = event.target.closest(".element");
      if (!activeTarget) return;
      offsetX =
        event.clientX - Number(activeTarget.style.left.replace("px", ""));
      offsetY =
        event.clientY - Number(activeTarget.style.top.replace("px", ""));
      // const rect = activeTarget.getBoundingClientRect();
      // console.log(rect)
      // offsetX = event.clientX - rect.left;
      // offsetY = event.clientY - rect.top;
      this.dragging_mode = true;
      activeTarget.style.cursor = "grabbing";
    };

    const onMouseMove = (event) => {
      if (!this.dragging_mode || !activeTarget) return;
      // const newX = event.clientX - offsetX;
      // const newY = event.clientY - offsetY;
      const rect = activeTarget.getBoundingClientRect();
      const newX = (event.clientX - offsetX) * this.MAP_SETTINGS.scale;
      const newY = (event.clientY - offsetY) * this.MAP_SETTINGS.scale;
      activeTarget.style.left = `${newX}px`;
      activeTarget.style.top = `${newY}px`;
      this.update();
    };

    const onMouseUp = (event) => {
      this.dragging_mode = false;
      if (activeTarget) activeTarget.style.cursor = "grab";
    };
    this.useDOM("screen").addEventListener("mousedown", onMouseDown);
    this.useDOM("screen").addEventListener("mousemove", onMouseMove);
    this.useDOM("screen").addEventListener("mouseup", onMouseUp);
    this.useDOM("screen").addEventListener("mouseleave", onMouseUp);
  }
  pushElement(objElement) {
    if (!objElement.id) {
      objElement.id = Date.now();
    }
    this.elements.push(objElement);
    this.createElement(objElement);
    this.notifySubcribeUpdateElements();
  }
  deleteElement(id) {
    this.elements = this.elements.filter((el) => el.id !== id);
    searchElementsById(id).remove();
    this.connections = this.connections.filter(
      (connection) => connection.from !== id && connection.to !== id
    );
    this.update();
    this.notifySubcribeUpdateElements();
  }

  // ФУНКЦИИ ДЛЯ ВЗАИМОДЕЙСТВИЯ С ОСНОВНЫМ КОНТРОЛЛЕРОМ
  getUseDOM(obj) {
    this.useDOM = obj;
  }
  getModeSettings(obj = {}) {
    console.log(obj)
    this.MODE_HANDLER = {
      CONSTANTS: obj.constants ?? this.MODE_HANDLER?.CONSTANTS,
      SET_MODE: obj.setMode ?? this.MODE_HANDLER?.SET_MODE,
      IS_MODE: obj.isMode ?? this.MODE_HANDLER?.IS_MODE,
    };
  }
  getElementsAndConnections() {
    return { elements: this.elements, connections: this.connections };
  }
  getModeSubscribe(callback) {
    this.modeSubscribers = callback;
  }
  getMapSettings(settings) {
    console.log(settings)
    this.MAP_SETTINGS = settings;
  }
  subcribeUpdateElements(callback) {
    if (typeof callback !== "function") {
      console.error("Подписчик должен быть функцией");
      return;
    }

    this.SUBSCRIBERS_TO_UPDATE_ELEMENTS.push(callback);

    return () => {
      this.SUBSCRIBERS_TO_UPDATE_ELEMENTS =
        this.SUBSCRIBERS_TO_UPDATE_ELEMENTS.filter((sub) => sub !== callback);
    };
  }

  notifySubcribeUpdateElements() {
    this.SUBSCRIBERS_TO_UPDATE_ELEMENTS.forEach((callback) =>
      callback(this.getElementsAndConnections())
    );
  }
}
