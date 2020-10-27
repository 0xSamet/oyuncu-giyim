import Head from "next/head";

import { useEffect } from "react";
import Header from "../Header";
import LeftMenu from "../LeftMenu";
import MobileMenu from "../MobileMenu";
import Footer from "../Footer";
import CartReview from "../CartReview";
import ModalCloser from "../ModalCloser";

import clsx from "clsx";
import { wrapper } from "../../store";

import { useSelector, useDispatch } from "react-redux";

const Layout = ({ children, title = "Oyuncu Giyim" }) => {
  const {
    header: { mobileSearchVisible },
    menu: { iconMode, tabletVisible },
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
          type: "TOGGLE_ICONMODE",
        });
      }
    }
    window.addEventListener("resize", checkMenu);
    return () => {
      window.removeEventListener("resize", checkMenu);
    };
  }, [iconMode]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
