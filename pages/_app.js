import "semantic-ui-css/semantic.min.css";
import "../styles/bootstrap-grid.css";
import "../styles/reset.css";
import "../styles/variables.scss";
import "../styles/header.scss";
import "../styles/homepage.scss";
import "../styles/footer.scss";
import "../styles/index.scss";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { wrapper } from "../store";
import { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Cookie from "js-cookie";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftMenu from "../components/LeftMenu";
import ModalCloser from "../components/ModalCloser";
import CartReview from "../components/CartReview";
import MobileMenu from "../components/MobileMenu";
import MobileSearch from "../components/MobileSearch";

import { toggleIconMode } from "../store/reducers/theme";

import { disablePageScroll, enablePageScroll, setFillGapMethod, clearQueueScrollLocks   } from 'scroll-lock';

function MyApp({ Component, pageProps }) {
  const {
    modals: { mobileSearchVisible, cartReviewVisible, notificationsVisible, desktopSearchVisible, loginFormVisible },
    theme: { iconMode },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isTabletMenuClosed, setIsTabletMenuClosed] = useState(false);
  useEffect(() => {

    Cookie.set("iconMode", iconMode);

    function checkMenu() {
      if (window.innerWidth < 1199 && !iconMode) {
        dispatch(toggleIconMode());
      }
    }
    if (!isTabletMenuClosed) {
      checkMenu();
      setIsTabletMenuClosed(true);
    }
    window.addEventListener("resize", checkMenu);
    return () => {
      window.removeEventListener("resize", checkMenu);
    };
  }, [iconMode]);

  useEffect(() => { 
    const scrollableEl = document.querySelector("body"); 
    setFillGapMethod("max-width");
    if (cartReviewVisible || mobileSearchVisible || notificationsVisible || loginFormVisible || desktopSearchVisible) {
      disablePageScroll(scrollableEl);
    }
    else {
      clearQueueScrollLocks();
      enablePageScroll(scrollableEl);
    }
  }, [cartReviewVisible, mobileSearchVisible, notificationsVisible, loginFormVisible, desktopSearchVisible]);

  return (
      <div
        className={clsx({
          "main-wrapper": true,
          "cart-review-active": cartReviewVisible,
          "mobile-search-active": mobileSearchVisible,
          "desktop-search-active": desktopSearchVisible,
          "theme-icon-mode-active": iconMode,
        })}
      >
        <Header />
        <main className="content-wrapper">
          <div className="row">
            <div className="page-left-wrapper">
              <LeftMenu />
            </div>
            <div className="page-right-wrapper">
              <Component {...pageProps} />
            </div>
          </div>
          <ModalCloser />
          <CartReview />
          <MobileMenu />
          <MobileSearch />
        </main>
        <Footer />
      </div>
  );
}

export async function getServerSideProps({Component, ctx}) {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
}

export default wrapper.withRedux(MyApp);
