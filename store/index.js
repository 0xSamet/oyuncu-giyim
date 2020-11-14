import { createStore, combineReducers, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";

import menuReducer from "./reducers/menu";
import modalsReducer from "./reducers/modals";
import themeReducer from "./reducers/theme";
import adminReducer from "./reducers/admin";
import pageReducer from "./reducers/page";

// create your reducer
const rootReducer = combineReducers({
  menu: menuReducer,
  modals: modalsReducer,
  theme: themeReducer,
  admin: adminReducer,
  page: pageReducer,
});

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function
const makeStore = (context) =>
  createStore(rootReducer, bindMiddleware([thunk]));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: false,
});

//process.env.NODE_ENV !== "production"
