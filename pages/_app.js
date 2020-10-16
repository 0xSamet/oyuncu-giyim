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

import clsx from "clsx";
import { wrapper } from "../store";

import { Provider, useSelector } from "react-redux";

function MyApp({ Component, pageProps }) {
  const { iconMode } = useSelector((state) => state);
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
      </main>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
