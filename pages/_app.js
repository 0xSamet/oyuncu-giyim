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
import { useSelector } from "react-redux";
import clsx from "clsx";

import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftMenu from "../components/LeftMenu";
import ModalCloser from "../components/ModalCloser";
import CartReview from "../components/CartReview";
import MobileMenu from "../components/MobileMenu";

function MyApp({ Component, pageProps }) {
    const {
    header: { mobileSearchVisible },
    menu: { iconMode, tabletVisible },
    modalCloser: {
      opened: modalCloserOpened,
      withBackGround: modalCloserWithBg,
    },
      body: { cartReviewVisible },
  } = useSelector((state) => state);
  return (
          <div
        className={clsx({
          "main-wrapper": true,
          "cart-review-active": cartReviewVisible,
          "mobile-search-active": mobileSearchVisible,
          "left-menu-icon-mode-active": iconMode,
        })}
      >
      <Header />
            <main className="content-wrapper">
        <div className="row">
          <div className="page-left-wrapper">
            <LeftMenu />
          </div>
          <div className="page-right-wrapper"><Component {...pageProps} /></div>
        </div>
        <ModalCloser />
        <CartReview />
        <MobileMenu />
      </main>
      
      <Footer />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
