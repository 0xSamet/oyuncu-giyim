import { wrapper } from "../store";
import { handleIconMode, handleMenuIndex } from "../utils";

import SEO from "../components/Seo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { GET_PAGE } from "../apollo/gql/query/page";
import NotFound from "../components/NotFound";

export default function DynamicPage({ notFound, page }) {

  if (notFound) {
    return <NotFound />;
  }

  return (
    <SEO seo={page} >
      <h1>Dynamic</h1>
    </SEO>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...ctx }) => {

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
        slug: `/${ctx.params.dynamicUrl}`
      }
    });

    if (data.page) {
      handleMenuIndex(store, data);
    } else {
      res.statusCode = 404;
    }

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        notFound: data.page === null,
        page: data.page
      },
    };
  }
);
