import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import "../styles/bootstrap-grid.css";
import "../styles/index.scss";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { useEffect } from 'react';

import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import Footer from "../components/Footer";
import CartReviewListItem from "../components/CartReviewListItem";

import clsx from "clsx";
import { wrapper } from "../store";

import { Provider, useSelector, useDispatch } from "react-redux";
import GoBackIcon from "../public/icons/go-back.svg";
import WalletIcon from "../public/icons/wallet.svg";
//import HamburgerMenu from "../public/icons/hamburger.svg";

function MyApp({ Component, pageProps }) {
  const {
    menu: {iconMode, tabletVisible},
    modalCloser: {
      opened: modalCloserOpened,
      withBackGround: modalCloserWithBg,
    },
    body: { cartReviewVisible },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    function checkMenu() {
      if (window.innerWidth < 1199 && iconMode) {
        dispatch({
          type: "TOGGLE_ICONMODE"
        });
      }
    }
    window.addEventListener("resize", checkMenu);
    return () => {
      window.removeEventListener("resize", checkMenu);
    }
  }, [iconMode]);
  return (
    <>
      <Header />
      <main
        className={clsx({
          "main-wrapper": true,
          "left-menu-icon-mode-active": iconMode,
          "left-menu-show-tablet": tabletVisible
        })}
      >
        <div className="row">
          <div className="page-left-wrapper">
            <LeftMenu />
            <div className="left-menu-tablet-opener" onClick={
              () => {
                dispatch({
                  type: "TOGGLE_TABLET_MENU",
                });
              }
            } >
              <div className={
                clsx({
                  "hamburger-wrapper": true,
                  "opened": tabletVisible
                })
              }>
                <svg id="icon" viewBox="0 0 800 600">
                    <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
                    <path d="M300,320 L540,320" id="middle"></path>
                    <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom"
                        transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
                </svg>
              </div>
            </div>
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
            <CartReviewListItem productId={1} />
            <CartReviewListItem productId={2} />
            <CartReviewListItem productId={3} />
            <CartReviewListItem productId={4} />
            <CartReviewListItem productId={5} />
            <CartReviewListItem productId={6} />
          </ul>
        </div>
        <div className="cart-review-status">
          <span className="cart-review-continue">
            <span className="cart-review-icon">
              <GoBackIcon />
            </span>
            Alışverişe Devam Et
          </span>
          <div className="cart-review-price-wrapper">
            <span className="cart-review-price-text">Toplam Fiyat</span>
            <span className="cart-review-price">100&#8378;</span>
          </div>
          <span className="cart-review-checkout">
            <span className="cart-review-icon">
              <WalletIcon />
            </span>
            Ödemeye Geç
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
