import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  adminLoginFormVisible: false,
  mobileMenuVisible: false,
  modalCloser: {
    opened: false,
    withBackground: false,
  },
};

const ADMIN_OPEN_MODAL_CLOSER = "ADMIN_OPEN_MODAL_CLOSER";
const ADMIN_OPEN_MODAL_WITH_BG = "ADMIN_OPEN_MODAL_WITH_BG";
const ADMIN_CLOSE_MODAL_CLOSER = "ADMIN_CLOSE_MODAL_CLOSER";

const ADMIN_CLOSE_ALL_MODALS = "ADMIN_CLOSE_ALL_MODALS";
const ADMIN_TOGGLE_LOGIN_FORM = "ADMIN_TOGGLE_LOGIN_FORM";
const ADMIN_TOGGLE_MOBILE_MENU = "ADMIN_TOGGLE_MOBILE_MENU";

export const openModalCloser = () => ({
  type: ADMIN_OPEN_MODAL_CLOSER,
});
export const openModalCloserwithBg = () => ({
  type: ADMIN_OPEN_MODAL_WITH_BG,
});
export const closeModalCloser = () => ({
  type: ADMIN_CLOSE_MODAL_CLOSER,
});
export const closeAllModals = () => ({
  type: ADMIN_CLOSE_ALL_MODALS,
});

export const toggleAdminLoginForm = () => ({
  type: ADMIN_TOGGLE_LOGIN_FORM,
});
export const toggleAdminMobileMenu = () => ({
  type: ADMIN_TOGGLE_MOBILE_MENU,
});

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.admin,
      };
    case ADMIN_CLOSE_ALL_MODALS:
      return produce(state, (draft) => {
        draft.adminLoginFormVisible = false;
        draft.mobileMenuVisible = false;
        draft.modalCloser.opened = false;
        draft.modalCloser.withBackground = false;
      });
    case ADMIN_TOGGLE_LOGIN_FORM:
      return produce(state, (draft) => {
        draft.adminLoginFormVisible = !draft.adminLoginFormVisible;
        draft.modalCloser.opened = true;
      });
    case ADMIN_TOGGLE_MOBILE_MENU:
      return produce(state, (draft) => {
        draft.mobileMenuVisible = !draft.mobileMenuVisible;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackground = true;
      });
    default:
      return state;
  }
};

export default adminReducer;
