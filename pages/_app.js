import "semantic-ui-css/semantic.min.css";
import "../styles/bootstrap-grid.css";
import "../styles/reset.css";
import "../styles/variables.scss";
import "../styles/header.scss";
import "../styles/homepage.scss";
import "../styles/footer.scss";
import "../styles/adminLayout.scss";
import "../styles/index.scss";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import "react-quill/dist/quill.snow.css";

import { wrapper } from "../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import NormalLayout from "../components/NormalLayout";
import AdminLayout from "../components/AdminLayout";

import {
  disablePageScroll,
  enablePageScroll,
  setFillGapMethod,
  clearQueueScrollLocks,
} from "scroll-lock";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";

function MyApp({ Component, pageProps }) {
  const {
    modals: {
      mobileSearchVisible,
      cartReviewVisible,
      notificationsVisible,
      desktopSearchVisible,
    },
  } = useSelector((state) => state);
  const router = useRouter();
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const scrollableEl = document.querySelector("body");
    //setFillGapMethod("none");
    if (
      cartReviewVisible ||
      mobileSearchVisible ||
      notificationsVisible ||
      desktopSearchVisible
    ) {
      if (notificationsVisible && innerWidth > 500) {
        return;
      }
      disablePageScroll(scrollableEl);
    } else {
      clearQueueScrollLocks();
      enablePageScroll(scrollableEl);
    }
  }, [
    cartReviewVisible,
    mobileSearchVisible,
    desktopSearchVisible,
    notificationsVisible,
  ]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      //console.log("App is changing to: ", url);
      //console.time("asd");
    };

    const handleRouteComplete = (url) => {
      //console.log("App is changed to: ", url);
      //console.timeEnd("asd");
    };

    /*document.querySelector("header").onclick = () => {
      const scrollableEl = document.querySelector("body");
      return disablePageScroll(scrollableEl);
    };

    document.querySelector(".main-menu").onclick = () => {
      const scrollableEl = document.querySelector("body");
      clearQueueScrollLocks();
      return enablePageScroll(scrollableEl);
    };*/

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      {router.route === "/404" ? (
        <NormalLayout>
          <Component {...pageProps} />
        </NormalLayout>
      ) : router.asPath.slice(0, 6) === "/admin" ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <NormalLayout>
          <Component {...pageProps} />
        </NormalLayout>
      )}
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
