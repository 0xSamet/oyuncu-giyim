import { wrapper } from "../store";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";

import { handleIconMode, handleMenuIndex } from "../utils";

import ShowCase from "../components/ShowCase";
import MainSlider from "../components/MainSlider";
import SEO from "../components/Seo";

import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { GET_PAGE } from "../apollo/gql/query/page";

import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { QueryBuilder } from "knex";
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

SwiperCore.use([Navigation, Autoplay, Pagination]);

// <pre>{JSON.stringify(data || {}, null, 2)}</pre>

export default function Home({ page }) {
    //console.log(data);
  return (
    <SEO seo={page} >
      <section className="homepage">
        <MainSlider />
        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </SEO>
  );
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async({ store, ...etc }) => {
    //handleIconMode(store, req);
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

    await apolloClient.query({
      query: GET_DESKTOP_MENU,
    });

    await apolloClient.query({
      query: GET_MOBILE_MENU,
    });

    const { data } = await apolloClient.query({
      query: GET_PAGE,
      variables: {
        slug: "/"
      }
    });

    if (!data.error) {
      handleMenuIndex(store, data);
    }

    return {
      revalidate: 60,
      props: {
        initialApolloState: apolloClient.cache.extract(),
        page: data.page
      },
    };
  }
);