import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { GET_PAGE } from "../apollo/gql/query/page";
import { wrapper } from "../store";
import { handleMenuIndex } from "../utils";
import iletisim from "./iletisim";

export default iletisim;

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, locale }: { store: any; locale: string }) => {
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

    const {
      data: { page },
    } = await apolloClient.query({
      query: GET_PAGE,
      variables: {
        slug: "/contact",
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
