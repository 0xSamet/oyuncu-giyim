import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
  CHANGE_DESKTOP_MENU_INDEX,
} from "../store/reducers/menu";
import { toggleIconMode } from "../store/reducers/theme";

export function handleIconMode(store, req) {
  if (req.cookies.iconMode && req.cookies.iconMode === "true") {
    store.dispatch(toggleIconMode());
  }
}
