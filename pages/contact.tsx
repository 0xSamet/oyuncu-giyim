import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { GET_PAGE } from "../apollo/gql/query/page";
import { wrapper } from "../store";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";
import { changeSlugs } from "../store/reducers/page";
import iletisim from "./iletisim";

export default iletisim;

export const getStaticProps = async ({
  store,
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

  return {
    props: {
      page: page,
      initialApolloState: apolloClient.cache.extract(),
      revalidate: 60,
    },
  };
};
