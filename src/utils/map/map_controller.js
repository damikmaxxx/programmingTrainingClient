export class MAP_CONTROLLER {
  constructor(
    map_settings,
    dom_elements_controller,
    DOM_ELEMENTS,
    ACTIVE_SCREEN
  ) {
    this.dom_controller = dom_elements_controller;
    this.MODE_CONSTANTS = {
      DEFAULT: "default",
      MOVING: "moving",
      EDITING: "editing",
      CREATING: "creating",
      CONNECTING: "connecting",
      COMMANDS:{
        BACK: "back"
      }
    };
    this.MODE_HISTORY = [];
    this.activeMode = this.MODE_CONSTANTS.DEFAULT;
    this._DOM_ELEMENTS = DOM_ELEMENTS;
    this._ACTIVE_SCREEN = ACTIVE_SCREEN;
    this.dom_controller.getUseDOM((obj) => this.useDOM(obj));
    this.dom_controller.getModeSettings({"constants":this.MODE_CONSTANTS,"setMode":(mode)=>this.setMode(mode),"isMode":(mode)=>this.isMode(mode)});
    this.dom_controller.getSubscribe((callback,modes)=>this.subscribeToUpdateModes(callback,modes));
    this.MAP_SETTINGS = {
      transformX: map_settings.transformX || 0,
      transformY: map_settings.transformY || 0,
    };
    this.SUBSCRIBERS_TO_UPDATE_MODE = [];
  }
  init() {
    this.dom_controller.init();
    this.initMoving();
    this.initToolsPanel();
  }
  initMoving() {
    this.transformX = this.MAP_SETTINGS.transformX || 0;
    this.transformY = this.MAP_SETTINGS.transformY || 0;

    this.mouse = { x: 0, y: 0 };
    this.scale = 1;
    const scaleFactor = 0.1;
    let scale = 1;
    let startPos = { x: 0, y: 0 };
    const offset = {
      x: 0,
      y: 0,
    };
    this._ACTIVE_SCREEN.addEventListener("mousedown", (event) => {
      if (event.button === 1 || event.button === 2) {
        this.setMode(this.MODE_CONSTANTS.MOVING);
        startPos = { x: event.clientX, y: event.clientY };
      }
      if (event.button === 0) {
        if (!this.isMode(this.MODE_CONSTANTS.CREATING)) return;
        event.preventDefault();

        let objElement = {
          html: document.getElementById("createBlockTextArea").value,
          position: {
            x: event.clientX - offset.x,
            y: event.clientY - offset.y,
          },
          params: { draggable: true },
        };
        this.dom_controller.pushElement(objElement);
      }
    });

    this._ACTIVE_SCREEN.addEventListener("mousemove", (event) => {
      if (this.isMode(this.MODE_CONSTANTS.MOVING)) {
        const deltaX = event.clientX - startPos.x;
        const deltaY = event.clientY - startPos.y;

        offset.x += deltaX;
        offset.y += deltaY;

        this._DOM_ELEMENTS.style.translate = `${offset.x}px ${offset.y}px`;

        startPos = { x: event.clientX, y: event.clientY };
      }
    });

    this._ACTIVE_SCREEN.addEventListener("mouseup", () => {
      if (this.isMode(this.MODE_CONSTANTS.MOVING)) {
        this.setMode(this.MODE_CONSTANTS.COMMANDS.BACK);
      }
    });
    this._ACTIVE_SCREEN.addEventListener("wheel", (event) => {
      this._DOM_ELEMENTS.style.transition = ".3s";
      const delta = Math.sign(-event.deltaY);

      const scaleOld = scale;
      scale *= Math.exp(delta * scaleFactor);

      const vptRect = this._ACTIVE_SCREEN.getBoundingClientRect();
      const cvsW = this._DOM_ELEMENTS.offsetWidth * scaleOld;
      const cvsH = this._DOM_ELEMENTS.offsetHeight * scaleOld;
      const cvsX = (this._ACTIVE_SCREEN.offsetWidth - cvsW) / 2 + offset.x;
      const cvsY = (this._ACTIVE_SCREEN.offsetHeight - cvsH) / 2 + offset.y;
      const originX = event.x - vptRect.x - cvsX - cvsW / 2;
      const originY = event.y - vptRect.y - cvsY - cvsH / 2;

      const xOrg = originX / scaleOld;
      const yOrg = originY / scaleOld;

      const xNew = xOrg * scale;
      const yNew = yOrg * scale;

      const xDiff = originX - xNew;
      const yDiff = originY - yNew;

      offset.x += xDiff;
      offset.y += yDiff;

      this._DOM_ELEMENTS.style.scale = scale;
      this._DOM_ELEMENTS.style.translate = `${offset.x}px ${offset.y}px`;
      setTimeout(() => {
        this._DOM_ELEMENTS.style.transition = "0s";
      }, 300);
    });

    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  initToolsPanel() {
    document.getElementById("editButton").addEventListener("click", () => {
      if (!this.isMode(this.MODE_CONSTANTS.EDITING)) {
        document.getElementById("toolspanel").classList.add("active");
        this.setMode(this.MODE_CONSTANTS.EDITING);
      } else {
        document.getElementById("toolspanel").classList.remove("active");
        this.setMode(this.MODE_CONSTANTS.DEFAULT);
        this.create_mode = false;
        document.getElementById("toggleCreateBlock").checked = false;
      }
    });
    document
      .getElementById("toggleCreateBlock")
      .addEventListener("click", (event) => {
        if (event.target.checked) this.setMode(this.MODE_CONSTANTS.CREATING);
        else this.setMode(this.MODE_CONSTANTS.EDITING);
      });
  }
  setMode(mode) {
    if (this.MODE_CONSTANTS.COMMANDS.BACK === mode) {
      this.activeMode = this.MODE_HISTORY.pop();
      this.notifySubscribers();
      console.log(`Активный режим установлен: ${this.activeMode}`);
      return;
    }
    const availableModes = Object.values(this.MODE_CONSTANTS);
    if (!availableModes.includes(mode)) {
      console.error(
        `Недопустимый режим: "${mode}". Доступные режимы: ${availableModes.join(
          ", "
        )}`
      );
      return;
    }
    this.MODE_HISTORY.push(this.activeMode);
    this.activeMode = mode;
    this.notifySubscribers();
    console.log(`Активный режим установлен: ${this.activeMode}`);
  }
  // ПОДПИСКА НА ИЗМЕНЕНИЕ МОДОВ 
  subscribeToUpdateModes(callback, modes = []) {
    if(typeof callback !== "function") return console.error("Подписчик должен быть функцией");
    const subscriber = { callback, modes };
    this.SUBSCRIBERS_TO_UPDATE_MODE.push(subscriber);
    return () => {
      this.SUBSCRIBERS_TO_UPDATE_MODE = this.SUBSCRIBERS_TO_UPDATE_MODE.filter(
          (sub) => sub.callback !== callback
      );
  };
  }
  // УВЕДОМЛЕНИЕ ПОДПИСЧИКОВ ОБ ИЗМЕНЕНИИ МОДА
  notifySubscribers() {
    this.SUBSCRIBERS_TO_UPDATE_MODE.forEach(({ callback, modes }) => {
      if (modes.length === 0 || modes.includes(this.activeMode)) {
        callback(this.activeMode);
      }
    });
  }
  // ПОЛУЧЕНИЕ ДОМ ЭЛЕМЕНТОВ ИЗ КОНТРОЛЛЕРА ДОМ ЭЛЕМЕНТОВ
  useDOM(input) {
    if (typeof input === "string") {
      if (input == "screen") {
        return this._ACTIVE_SCREEN;
      }
      if (input == "elements") {
        return this._DOM_ELEMENTS;
      }
    }
  }
  isMode(mode) {
    if (this.activeMode === mode) return true;
    return false;
  }
  // Выдача карты
  getMap()  {
    return this.dom_controller.getElementsAndConnections();
  }
}
