import SEO from "../components/Seo";
import { useDispatch } from "react-redux";
import { GET_PAGE } from "../apollo/gql/query/page";
import { ApolloClient, NormalizedCacheObject, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import { GET_DESKTOP_MENU, GET_MOBILE_MENU } from "../apollo/gql/query/menu";
import { changeSlugs } from "../store/reducers/page";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";
import { useEffect } from "react";

export default function Iletisim({ page }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeDesktopMenuIndex(page.desktop_menu_id || -1));
    dispatch(changeMobileMenuIndex(page.mobile_menu_id || -1));
    dispatch(changeSlugs(page.slugs));
  }, []);

  return (
    <SEO seo={{ meta_title: "", meta_description: "", meta_keyword: "" }}>
      <h1>İletişim</h1>
      <pre>{JSON.stringify(page || {}, null, 2)}</pre>
    </SEO>
  );
}

// export const getStaticProps = async ({
//   store,
//   locale,
// }: {
//   store: any;
//   locale: string;
// }) => {
//   const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();

//   const {
//     data: { page },
//   } = await apolloClient.query({
//     query: GET_PAGE,
//     variables: {
//       slug: "/iletisim",
//       language: locale,
//     },
//   });

//   if (!page) {
//     return {
//       notFound: true,
//     };
//   }

//   await apolloClient.query({
//     query: GET_DESKTOP_MENU,
//     variables: {
//       language: locale,
//     },
//   });

//   await apolloClient.query({
//     query: GET_MOBILE_MENU,
//     variables: {
//       language: locale,
//     },
//   });

//   return {
//     props: {
//       page: page,
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 60,
//   };
// };
