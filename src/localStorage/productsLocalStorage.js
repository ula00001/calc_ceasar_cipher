export function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("shopBasket", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("shopBasket");
    if (serialisedState === null) return [];
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return [];
  }
}