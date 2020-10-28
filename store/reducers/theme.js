import produce from "immer"
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    iconMode: false
};

const TOGGLE_ICONMODE = "TOGGLE_ICONMODE";

export const toggleIconMode = () => ({
    type: TOGGLE_ICONMODE
});

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.theme
      }
    case TOGGLE_ICONMODE:
      return produce(state, draft => {
        draft.iconMode = !draft.iconMode
      });
    default:
      return state;
  }
};

export default themeReducer;