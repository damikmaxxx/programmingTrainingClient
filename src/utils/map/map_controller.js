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
      COMMANDS: {
        BACK: "back",
      },
      USER: "user",
      ADMIN: "admin",
    };

    this.MODE_HISTORY = [];
    this.activeMode = this.MODE_CONSTANTS.DEFAULT;
    this._DOM_ELEMENTS = DOM_ELEMENTS;
    this._ACTIVE_SCREEN = ACTIVE_SCREEN;
    this.MAP_SETTINGS = {
      X: map_settings.transformX || 0,
      Y: map_settings.transformY || 0,
      scale: map_settings.scale || 1,
      mode: map_settings.mode || "admin",
    };
    this.SUBSCRIBERS_TO_UPDATE_MODE = [];

    this.dom_controller.getUseDOM((obj) => this.useDOM(obj));
    this.dom_controller.getModeSettings({
      constants: this.MODE_CONSTANTS,
      setMode: (mode) => this.setMode(mode),
      isMode: (mode) => this.isMode(mode),
    });
    this.dom_controller.getModeSubscribe((callback, modes) =>
      this.subscribeToUpdateModes(callback, modes)
    );
    this.dom_controller.getMapSettings(this.MAP_SETTINGS);
  }
  init() {
    this.dom_controller.init();
    this.initMoving();
    this.initToolsPanel();
  }
  initMoving() {
    // if (this.MAP_SETTINGS.mode === this.MODE_CONSTANTS.USER) return;
    const scaleFactor = 0.1;
    let startPos = { x: this.MAP_SETTINGS.X, y: this.MAP_SETTINGS.Y };
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
            x: event.clientX - this.MAP_SETTINGS.X,
            y: event.clientY - this.MAP_SETTINGS.y,
          },
          params: { draggable: true },
        };
        this.dom_controller.pushElement(objElement);
      }
    });

    this._ACTIVE_SCREEN.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (this.isMode(this.MODE_CONSTANTS.MOVING)) {
        const deltaX = event.clientX - startPos.x;
        const deltaY = event.clientY - startPos.y;

        this.MAP_SETTINGS.X += deltaX;
        this.MAP_SETTINGS.Y += deltaY;
        this._DOM_ELEMENTS.style.translate = `${this.MAP_SETTINGS.X}px ${this.MAP_SETTINGS.Y}px`;

        startPos = { x: event.clientX, y: event.clientY };
      }
    });

    document.addEventListener("mouseup", (event) => {
      event.preventDefault();
      if (this.isMode(this.MODE_CONSTANTS.MOVING)) {
        this.setMode(this.MODE_CONSTANTS.COMMANDS.BACK);
      }
    });
    this._ACTIVE_SCREEN.addEventListener("wheel", (event) => {
      const delta = Math.sign(-event.deltaY);

      const scaleOld = this.MAP_SETTINGS.scale;
      this.MAP_SETTINGS.scale *= Math.exp(delta * scaleFactor);

      const vptRect = this._ACTIVE_SCREEN.getBoundingClientRect();
      const cvsW = this._DOM_ELEMENTS.offsetWidth * scaleOld;
      const cvsH = this._DOM_ELEMENTS.offsetHeight * scaleOld;
      const cvsX =
        (this._ACTIVE_SCREEN.offsetWidth - cvsW) / 2 + this.MAP_SETTINGS.X;
      const cvsY =
        (this._ACTIVE_SCREEN.offsetHeight - cvsH) / 2 + this.MAP_SETTINGS.Y;
      const originX = event.x - vptRect.x - cvsX - cvsW / 2;
      const originY = event.y - vptRect.y - cvsY - cvsH / 2;

      const xOrg = originX / scaleOld;
      const yOrg = originY / scaleOld;

      const xNew = xOrg * this.MAP_SETTINGS.scale;
      const yNew = yOrg * this.MAP_SETTINGS.scale;

      const xDiff = originX - xNew;
      const yDiff = originY - yNew;

      this.MAP_SETTINGS.X += xDiff;
      this.MAP_SETTINGS.Y += yDiff;

      this._DOM_ELEMENTS.style.scale = this.MAP_SETTINGS.scale;
      this._DOM_ELEMENTS.style.translate = `${this.MAP_SETTINGS.X}px ${this.MAP_SETTINGS.Y}px`;
    });

    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  initToolsPanel() {
    if (this.MAP_SETTINGS.mode === this.MODE_CONSTANTS.USER) return;
    const editButton = document.getElementById("editButton");
    const toolsPanel = document.getElementById("toolspanel");
    const toggleCreateBlock = document.getElementById("toggleCreateBlock");

    if (editButton) {
      editButton.addEventListener("click", () => {
        if (!this.isMode(this.MODE_CONSTANTS.EDITING)) {
          toolsPanel?.classList.add("active");
          this.setMode(this.MODE_CONSTANTS.EDITING);
        } else {
          toolsPanel?.classList.remove("active");
          this.setMode(this.MODE_CONSTANTS.DEFAULT);
          this.create_mode = false;
          if (toggleCreateBlock) {
            toggleCreateBlock.checked = false;
          }
        }
      });
    }

    if (toggleCreateBlock) {
      toggleCreateBlock.addEventListener("click", (event) => {
        this.setMode(
          event.target.checked
            ? this.MODE_CONSTANTS.CREATING
            : this.MODE_CONSTANTS.EDITING
        );
      });
    }
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
    if (typeof callback !== "function")
      return console.error("Подписчик должен быть функцией");
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
  getMap() {
    return this.dom_controller.getElementsAndConnections();
  }
  addNewElement(obj) {
    console.log(obj, this.MAP_SETTINGS.X, this.MAP_SETTINGS.Y);
    obj.position.x -= this.MAP_SETTINGS.X;
    obj.position.y -= this.MAP_SETTINGS.Y;
    this.dom_controller.pushElement(obj);
  }
  subcribeUpdateElements(callback) {
    return this.dom_controller.subcribeUpdateElements((obj) => callback(obj));
  }
}
