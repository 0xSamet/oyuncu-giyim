import SEO from "../components/Seo";
import { wrapper } from "../store";
import { handleIconMode } from "../utils";
import NotFound from "../components/NotFound";

export default function NotFoundPage() {
  return (
    <SEO
      seo={{
        meta_title: "Sayfa Bulunamadı - Oyuncu Giyim",
        meta_description: "",
        meta_keyword: "",
      }}
    >
      <NotFound />
    </SEO>
  );
}
