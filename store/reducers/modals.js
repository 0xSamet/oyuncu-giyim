import produce from "immer"

const initialState = {
  modalCloser: {
    opened: false,
    withBackGround: false,
  },
    loginFormVisible: false,
    notificationsVisible: false,
    mobileSearchVisible: false,
    cartReviewVisible: false,
};

const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS";
const OPEN_LOGIN_FORM = "OPEN_LOGIN_FORM";
const OPEN_NOTIFICATIONS = "OPEN_NOTIFICATIONS";
const OPEN_CART_REVIEW = "OPEN_CART_REVIEW";
const OPEN_MOBILE_SEARCH = "OPEN_MOBILE_SEARCH";

export const closeAllModals = () => ({
    type: CLOSE_ALL_MODALS
});
export const openLoginForm = () => ({
    type: OPEN_LOGIN_FORM
});
export const openNotifications = () => ({
    type: OPEN_NOTIFICATIONS
});
export const openCartReview = () => ({
    type: OPEN_CART_REVIEW
});
export const openMobileSearch = () => ({
    type: OPEN_MOBILE_SEARCH
});

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_ALL_MODALS:
      return produce(state, draft => {
        draft.modalCloser.opened = false;
        draft.modalCloser.withBackGround = false;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
      });
    case OPEN_LOGIN_FORM:
      return produce(state, draft => {
        draft.loginFormVisible = true;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
        draft.modalCloser.opened = true;
      });
    case OPEN_NOTIFICATIONS:
      return produce(state, draft => {
        draft.notificationsVisible = true;
        draft.loginFormVisible = false;
        draft.cartReviewVisible = false;
        draft.mobileSearchVisible = false;
        draft.modalCloser.opened = true;
      });
    case OPEN_CART_REVIEW:
      return produce(state, draft => {
        draft.cartReviewVisible = true;
        draft.loginFormVisible = false;
        draft.notificationsVisible = false;
        draft.mobileSearchVisible = false;
        draft.modalCloser.opened = true;
        draft.modalCloser.withBackGround = true;
      });
    case OPEN_MOBILE_SEARCH:
      return produce(state, draft => {
        draft.mobileSearchVisible = true;
        draft.notificationsVisible = false;
        draft.cartReviewVisible = false;
        draft.modalCloser.opened = true;
      });
    default:
      return state;
  }
};

export default modalsReducer;