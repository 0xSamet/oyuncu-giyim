import produce from "immer"
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    desktopMenu: {
      index: -1,
    },
    mobileMenu: {
      index: -1,
    }
};

export const CHANGE_DESKTOP_MENU_INDEX = "CHANGE_DESKTOP_MENU_INDEX";

export const changeDesktopMenuIndex = (index) => ({
  type: CHANGE_DESKTOP_MENU_INDEX,
  payload: {
    index
  }
});

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.menu
      }
    case CHANGE_DESKTOP_MENU_INDEX:
      return produce(state, draft => {
        draft.desktopMenu.index = action.payload.index;
      });
    default:
      return state;
  }
};

export default menuReducer;