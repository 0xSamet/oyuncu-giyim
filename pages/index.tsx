import { wrapper } from "../store";
import { handleIconMode } from "../utils";

import ShowCase from "../components/ShowCase";
import MainSlider from "../components/MainSlider";
import SEO from "../components/Seo";

import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_PAGE } from "../apollo/gql/query/page";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { useRouter } from "next/router";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";
import { changeSlugs } from "../store/reducers/page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

SwiperCore.use([Navigation, Autoplay, Pagination]);

export default function Home({ page }) {
  //console.log(data);
  //console.log(localization);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeDesktopMenuIndex(page.desktop_menu_id || -1));
    dispatch(changeMobileMenuIndex(page.mobile_menu_id || -1));
    dispatch(changeSlugs(page.slugs));
  }, []);

  return (
    <SEO seo={{ meta_title: "", meta_description: "", meta_keyword: "" }}>
      <section className="homepage">
        {JSON.stringify(page || {}, null, 2)}
        <MainSlider />
        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </SEO>
  );
}

export const getStaticProps = async ({
  locale,
}: {
  store: any;
  locale: string;
}) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

  console.log(apolloClient.link);

  const {
    data: { page },
  } = await apolloClient.query({
    query: GET_PAGE,
    variables: {
      slug: "/",
      language: locale,
    },
  });

  if (!page) {
    return {
      notFound: true,
    };
  }

  await apolloClient.query({
    query: GET_DESKTOP_MENU,
    variables: {
      language: locale,
    },
  });

  await apolloClient.query({
    query: GET_MOBILE_MENU,
    variables: {
      language: locale,
    },
  });

  return {
    props: {
      page: page,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
