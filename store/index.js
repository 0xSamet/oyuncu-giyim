import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const initialState = {
  iconMode: false,
  modalCloserOpened: false,
  header: {
    loginFormVisible: false,
  },
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("hyd");
      return { ...state, ...action.payload };
    case "TOGGLE_ICONMODE":
      return { ...state, iconMode: !state.iconMode };
    case "TOGGLE_LOGIN_FORM":
      return {
        ...state,
        modalCloserOpened: !state.modalCloserOpened,
        header: {
          ...state.header,
          loginFormVisible: !state.header.loginFormVisible,
        },
      };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
