import SEO from "../components/Seo";
import { wrapper } from "../store";
import { handleIconMode } from "../utils";

export default function Sepetim() {
  return (
    <SEO
      seo={{
        meta_title: "Sepetim - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <h1>Sepetim</h1>
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
