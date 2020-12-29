import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  firstLoading: true,
  slugs: [],
};

export const TOGGLE_FIRST_LOADING = "TOGGLE_FIRST_LOADING";
export const CHANGE_SLUGS = "CHANGE_SLUGS";

export const toggleFirstLoading = () => ({
  type: TOGGLE_FIRST_LOADING,
});

export const changeSlugs = (slugs) => ({
  type: CHANGE_SLUGS,
  payload: {
    slugs,
  },
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
    case CHANGE_SLUGS:
      return produce(state, (draft) => {
        draft.slugs = action.payload.slugs || [];
      });
    default:
      return state;
  }
};

export default pageReducer;
