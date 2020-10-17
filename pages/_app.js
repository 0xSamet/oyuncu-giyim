import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import "../styles/bootstrap-grid.css";
import "../styles/index.scss";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import Footer from "../components/Footer";
import CartReviewListItem from "../components/CartReviewListItem";

import clsx from "clsx";
import { wrapper } from "../store";

import { Provider, useSelector, useDispatch } from "react-redux";
import GoBackIcon from "../public/icons/go-back.svg";

function MyApp({ Component, pageProps }) {
  const {
    iconMode,
    modalCloser: {
      opened: modalCloserOpened,
      withBackGround: modalCloserWithBg,
    },
    body: { cartReviewVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <main
        className={clsx({
          "main-wrapper": true,
          "left-menu-icon-mode-active": iconMode,
        })}
      >
        <div className="row">
          <div className="page-left-wrapper">
            <LeftMenu />
          </div>
          <div className="page-right-wrapper">
            <Component {...pageProps} />
          </div>
        </div>
        <div
          className={clsx({
            "modal-closer": true,
            open: modalCloserOpened,
            "with-bg": modalCloserWithBg,
          })}
          onClick={() => {
            dispatch({
              type: "CLEAN_MODALS",
            });
          }}
        ></div>
        <div
          className={clsx({
            "cart-review": true,
            "cart-review-active": cartReviewVisible,
          })}
        >
          <div className="cart-review-top">
            <span className="cart-review-title">Sepetiniz</span>
            <span
              className="cart-review-go-back"
              onClick={() => {
                dispatch({
                  type: "CLEAN_MODALS",
                });
              }}
            >
              <GoBackIcon />
            </span>
          </div>
          <ul className="products">
            <CartReviewListItem productId={1} />
            <CartReviewListItem productId={2} />
            <CartReviewListItem productId={3} />
            <CartReviewListItem productId={4} />
            <CartReviewListItem productId={5} />
            <CartReviewListItem productId={6} />
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
