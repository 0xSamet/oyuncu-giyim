import "../styles/globals.css";
import "../styles/bootstrap-grid.css";
import "../styles/index.scss";
import "semantic-ui-css/semantic.min.css";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="main-wrapper">
        <div className="row">
          <div className="page-left-wrapper">
            <LeftMenu />
          </div>
          <div className="page-right-wrapper">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </>
  );
}

export default MyApp;
