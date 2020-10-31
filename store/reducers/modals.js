import produce from "immer"
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  modalCloser: {
    opened: false,
    withBackGround: false,
  },
  loginFormVisible: false,
  notificationsVisible: false,
  mobileSearchVisible: false,
  cartReviewVisible: false,
  desktopSearchVisible: false
};

const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS";
const TOGGLE_LOGIN_FORM = "TOGGLE_LOGIN_FORM";
const TOGGLE_NOTIFICATIONS = "TOGGLE_NOTIFICATIONS";
const TOGGLE_CART_REVIEW = "TOGGLE_CART_REVIEW";
const TOGGLE_DESKTOP_SEARCH = "TOGGLE_DESKTOP_SEARCH";
const TOGGLE_MOBILE_SEARCH = "TOGGLE_MOBILE_SEARCH";

export const closeAllModals = () => ({
    type: CLOSE_ALL_MODALS
});
export const toggleLoginForm = () => ({
    type: TOGGLE_LOGIN_FORM
});
export const toggleNotifications = () => ({
    type: TOGGLE_NOTIFICATIONS
});
export const toggleCartReview = () => ({
    type: TOGGLE_CART_REVIEW
});
export const toggleMobileSearch = () => ({
    type: TOGGLE_MOBILE_SEARCH
});
export const toggleDesktopSearch = () => ({
    type: TOGGLE_DESKTOP_SEARCH
});

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.modals
      }
    case CLOSE_ALL_MODALS:
      return produce(state, draft => {
        draft.modalCloser.opened = false;
        draft.modalCloser.withBackGround = false;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
        draft.desktopSearchVisible = false;
      });
    case TOGGLE_LOGIN_FORM:
      return produce(state, draft => {
        draft.loginFormVisible = !draft.loginFormVisible;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackGround = false;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
        draft.desktopSearchVisible = false;
      });
    case TOGGLE_NOTIFICATIONS:
      return produce(state, draft => {
        draft.notificationsVisible = !draft.notificationsVisible;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackGround = false;
        draft.loginFormVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
        draft.desktopSearchVisible = false;
      });
    case TOGGLE_CART_REVIEW:
      return produce(state, draft => {
        draft.cartReviewVisible = !draft.cartReviewVisible;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackGround = true;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.mobileSearchVisible = false;
        draft.desktopSearchVisible = false;
      });
    case TOGGLE_MOBILE_SEARCH:
      return produce(state, draft => {
        draft.mobileSearchVisible = !draft.mobileSearchVisible;
        draft.modalCloser.opened = false;
        draft.modalCloser.withBackGround = false;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.desktopSearchVisible = false;
      });
    case TOGGLE_DESKTOP_SEARCH:
      return produce(state, draft => {
        draft.desktopSearchVisible = !draft.desktopSearchVisible;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackGround = true;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
      });
    default:
      return state;
  }
};

export default modalsReducer;