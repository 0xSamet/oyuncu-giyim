import { wrapper } from "../store";
//import { changeDesktopMenuIndex, changeMobileMenuIndex } from "../store/reducers/menu";
import { handleIconMode } from "../utils";

import Layout from "../components/Layout";

export default function Kategoriler() {
  return (
    <Layout title="Kategoriler - Oyuncu Giyim">
      <h1>Dynamic</h1>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store, req, res, ...etc }) => {
    handleIconMode(store, req);
    //store.dispatch();
    return {
      props: { sad: "asd" },
    };
  }
);
