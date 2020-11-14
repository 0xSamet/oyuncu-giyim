import SEO from "../components/Seo";
import { wrapper } from "../store";
import { handleIconMode } from "../utils";
import NotFound from "../components/NotFound";

export default function NotFound() {
  return (
    <SEO title="Sayfa Bulunamadı - Oyuncu Giyim">
      <NotFound />
    </SEO>
  );
}
