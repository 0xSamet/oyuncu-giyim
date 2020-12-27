import SEO from "../components/Seo";
import { useDispatch } from "react-redux";
import { wrapper } from "../store";
import { handleMenuIndex } from "../utils";
import { GET_PAGE } from "../apollo/gql/query/page";
import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";

export default function Iletisim({ page }) {
  const dispatch = useDispatch();

  return (
    <SEO seo={{ meta_title: "", meta_description: "", meta_keyword: "" }}>
      <h1>İletişim</h1>
      <pre>{JSON.stringify(page || {}, null, 2)}</pre>
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
        slug: "/iletisim",
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
      revalidate: 1,
    };
  }
);
