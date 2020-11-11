import { toggleIconMode } from "../store/reducers/theme";

export function handleIconMode(store, req) {
  if (req.cookies.iconMode && req.cookies.iconMode === "true") {
    store.dispatch(toggleIconMode());
  }
}

export function handleFirstLoading(store, req) {
  if (req.cookies.iconMode && req.cookies.iconMode === "true") {
    store.dispatch(toggleIconMode());
  }
}
