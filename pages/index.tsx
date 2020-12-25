import { wrapper } from "../store";
import { handleIconMode, handleMenuIndex } from "../utils";

import ShowCase from "../components/ShowCase";
import MainSlider from "../components/MainSlider";
import SEO from "../components/Seo";

import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_PAGE } from "../apollo/gql/query/page";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { useRouter } from "next/router";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";

SwiperCore.use([Navigation, Autoplay, Pagination]);

export default function Home({ page }) {
  //console.log(data);
  //console.log(localization);
  const router = useRouter();
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

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, locale }: { store: any; locale: string }) => {
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

    handleMenuIndex(store, {
      desktop_menu_id: page.desktop_menu_id,
      mobile_menu_id: page.mobile_menu_id,
    });

    return {
      props: {
        page: page,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
);
