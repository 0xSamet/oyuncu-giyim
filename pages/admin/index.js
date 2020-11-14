import { GetStaticProps } from "next";
import SEO from "../../components/Seo";

export default function AdminDashboard({ page }) {
  return (
    <SEO seo={page}>
      <h1>Admin-home</h1>
    </SEO>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      page: {
        meta_title: "Admin - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      },
    },
  };
};
