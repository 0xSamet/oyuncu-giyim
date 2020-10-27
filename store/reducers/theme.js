import produce from "immer"

const initialState = {
    iconMode: false
};

const TOGGLE_ICONMODE = "TOGGLE_ICONMODE";

export const toggleIconMode = () => ({
    type: TOGGLE_ICONMODE
});

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ICONMODE:
      return produce(state, draft => {
        draft.iconMode = !draft.iconMode
      });
    default:
      return state;
  }
};

export default themeReducer;