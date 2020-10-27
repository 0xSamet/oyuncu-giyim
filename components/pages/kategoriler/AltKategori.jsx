import Layout from "../Layout";
import { useRouter } from "next/router";

export default function AltKategori() {
  const { query } = useRouter();
  /*useEffect(() => {
    if (query.AltKategori ) {
      
    }
  }, [input])*/
  return (
    <Layout title="Alt Kategori - Oyuncu Giyim">
      <h1>Alt Kategori</h1>
    </Layout>
  );
}
