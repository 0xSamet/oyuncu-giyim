import { GetStaticProps } from "next";
import SEO from "../../../../components/Seo";

export default function AdminDashboard({ page }) {
  return (
    <SEO
      seo={{
        meta_title: "Kategoriler - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <h1>Admin-kategoriler-edit</h1>
    </SEO>
  );
}
