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
// import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu.ts";
import { GET_PAGE } from "../apollo/gql/query/page";

import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { QueryBuilder } from "knex";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useRouter } from "next/router";

SwiperCore.use([Navigation, Autoplay, Pagination]);

export default function Home() {
  //console.log(data);
  //console.log(localization);
  const router = useRouter();
  console.log(router);
  return (
    <SEO seo={{ meta_title: "", meta_description: "", meta_keyword: "" }}>
      <section className="homepage">
        <MainSlider />
        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </SEO>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      asd: "sad",
    },
  };
};

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   async ({ store, ...etc }) => {
//     //handleIconMode(store, req);
//     const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

//     await apolloClient.query({
//       query: GET_DESKTOP_MENU,
//     });

//     await apolloClient.query({
//       query: GET_MOBILE_MENU,
//     });

//     const { data } = await apolloClient.query({
//       query: GET_PAGE,
//       variables: {
//         slug: "/",
//       },
//     });

//     if (!data.error) {
//       handleMenuIndex(store, data);
//     }

//     return {
//       revalidate: 60,
//       props: {
//         initialApolloState: apolloClient.cache.extract(),
//         page: data.page,
//       },
//     };
//   }
// );
