export function searchElementsById(id, type = "element") {
  const prefix = type === "line" ? "line_" : "element_";
  return document.getElementById(`${prefix}${id}`);
}

export function getIdFromDomElement(dom_element) {
  if (dom_element && dom_element.id) {
    return Number(dom_element.id.split("_")[1]);
  }
  return null;
}

export function getTranslateWithoutEffects(dom_element) {
  const style = window.getComputedStyle(dom_element);
  const transform = style.transform;
  let translate = { x: 0, y: 0 };
  if (transform && transform !== "none") {
    const values = transform.match(/[-+]?\d*\.?\d+/g);
    if (values) {
      translate.x = parseFloat(values[4]);
      translate.y = parseFloat(values[5]);
    }
  }
  return translate;
}