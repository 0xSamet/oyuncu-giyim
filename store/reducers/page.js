import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  firstLoading: true,
};

export const TOGGLE_FIRST_LOADING = "TOGGLE_FIRST_LOADING";

export const toggleFirstLoading = () => ({
  type: TOGGLE_FIRST_LOADING,
});

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.page,
      };
    case TOGGLE_FIRST_LOADING:
      return produce(state, (draft) => {
        draft.firstLoading = !draft.firstLoading;
      });
    default:
      return state;
  }
};

export default pageReducer;
