export function saveFavoritesToLocal(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("shopFavorites", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFavoritesFromLocal() {
  try {
    const serialisedState = localStorage.getItem("shopFavorites");
    if (serialisedState === null) return [];
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return [];
  }
}