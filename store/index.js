import { createStore, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import menuReducer from "./reducers/menu";
import modalsReducer from "./reducers/modals";
import themeReducer from "./reducers/theme";

// create your reducer
const rootReducer = combineReducers({
  menu: menuReducer,
  modals: modalsReducer,
  theme: themeReducer
});


// create a makeStore function
const makeStore = (context) => createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
