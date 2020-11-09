import { wrapper } from "../store";
import {
  changeDesktopMenuIndex,
  changeMobileMenuIndex,
} from "../store/reducers/menu";
import { handleIconMode } from "../utils";
import { initializeApollo } from "../apollo/client";
import { GET_MENU } from "../apollo/query/menu";

/*export const getServerSideProps = wrapper.getServerSideProps(
    ({ store, req, res, ...etc }) => {
        
        handleIconMode(store, req);
        store.dispatch(changeDesktopMenuIndex(0));
        store.dispatch(changeMobileMenuIndex(0));
        return {
            props: {
                sad: "asd"
            }
        }
    }
);*/

/*export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_MENU,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}*/

import SwiperCore, { Navigation } from "swiper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ShowCase from "../components/ShowCase";
import MainSlider from "../components/MainSlider";
import Layout from "../components/Layout";

import { useQuery } from "@apollo/client";

SwiperCore.use([Navigation]);

export default function Home(p) {
  const { data, loading } = useQuery(GET_MENU);
  //console.log(loading, data);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Layout title="Anasayfa - Oyuncu Giyim">
      <section className="homepage">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <MainSlider />
        <ShowCase showCaseId={1} />
        <ShowCase showCaseId={2} />
        <ShowCase showCaseId={3} />
      </section>
    </Layout>
  );
}
