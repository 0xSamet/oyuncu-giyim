import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const initialState = {
  iconMode: false,
  menu: {
    iconMode: false,
    tabletVisible: false,
  },
  modalCloser: {
    opened: false,
    withBackGround: false,
  },
  header: {
    loginFormVisible: false,
    notificationsVisible: false,
  },
  body: {
    cartReviewVisible: false,
  },
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("hyd");
      return { ...state, ...action.payload };

    case "TOGGLE_ICONMODE":
      return { ...state, menu: { ...state.menu, iconMode: !state.menu.iconMode } };
    case "TOGGLE_TABLET_MENU":
      return { ...state, menu: { ...state.menu, tabletVisible: !state.menu.tabletVisible }};
    case "CLEAN_MODALS":
      return {
        ...state,
        modalCloser: {
          ...state.modalCloser,
          opened: false,
          withBackGround: false,
        },
        header: {
          ...state.header,
          loginFormVisible: false,
          notificationsVisible: false,
        },
        body: {
          ...state.body,
          cartReviewVisible: false,
        },
      };
    case "TOGGLE_LOGIN_FORM":
      return {
        ...state,
        modalCloser: {
          ...state.modalCloser,
          opened: true,
          withBackGround: false,
        },
        header: {
          ...state.header,
          loginFormVisible: !state.header.loginFormVisible,
        },
      };
    case "TOGGLE_NOTIFICATIONS":
      return {
        ...state,
        modalCloser: {
          ...state.modalCloser,
          opened: true,
          withBackGround: false,
        },
        header: {
          ...state.header,
          notificationsVisible: !state.header.notificationsVisible,
        },
      };
    case "TOGGLE_CART_REVIEW":
      return {
        ...state,
        modalCloser: {
          ...state.modalCloser,
          opened: true,
          withBackGround: true,
        },
        body: {
          ...state.body,
          cartReviewVisible: !state.body.cartReviewVisible,
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
