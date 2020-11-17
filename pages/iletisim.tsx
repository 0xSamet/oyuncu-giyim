import SEO from "../components/Seo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";
import { wrapper } from "../store";
import { handleIconMode, handleMenuIndex } from "../utils";
import { GET_PAGE } from "../apollo/gql/query/page";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";

export default function Iletisim({ page }) {
  const dispatch = useDispatch();

  return (
    <SEO seo={page} >
      <h1>İletişim</h1>
    </SEO>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    handleIconMode(store, req);
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
        slug: "/iletisim",
      },
    });

    if (!data.error) {
      handleMenuIndex(store, data);
    }

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        page: data.page
      },
    };
  }
);
