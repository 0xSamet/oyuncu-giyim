import SEO from "../../components/Seo";
import { wrapper } from "../../store";
import { handleIconMode } from "../../utils";

export default function Kategoriler() {
  return (
    <SEO title="Kategoriler - Oyuncu Giyim">
      <h1>Kategoriler</h1>
    </SEO>
  );
}

export const getServerSideProps = wrapper.getStaticProps(
  async ({ store, req, res, ...etc }) => {
    handleIconMode(store, req);
    //store.dispatch();

    return {
      props: {
        asd: "asd",
      },
    };
  }
);
