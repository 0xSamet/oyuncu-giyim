import { useSelector } from "react-redux";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import ModalCloser from "./ModalCloser";
import CartReview from "./CartReview";
import MobileMenu from "./MobileMenu";
import MobileSearch from "./MobileSearch";
import Footer from "./Footer";
import clsx from "clsx";

const NormalLayout = ({ children }) => {
  const {
    modals: { mobileSearchVisible, cartReviewVisible, desktopSearchVisible },
    theme: { iconMode },
  } = useSelector((state) => state);
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
          <div className="page-right-wrapper">{children}</div>
        </div>
        <ModalCloser />
        <CartReview />
        <MobileMenu />
        <MobileSearch />
      </main>
      <Footer />
    </div>
  );
};

export default NormalLayout;
