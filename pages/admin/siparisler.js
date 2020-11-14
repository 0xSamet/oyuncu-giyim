import { GetStaticProps } from "next";
import SEO from "../../components/Seo";

export default function AdminDashboard({ page }) {
  return (
    <SEO seo={page}>
      <h1>Admin-siparişler</h1>
    </SEO>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      page: {
        meta_title: "Siparişler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      },
    },
  };
};
