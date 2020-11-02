import Layout from "../Layout";
import { useRouter } from "next/router";

export default function AltKategori() {
  const {
    query: { dynamicUrl },
  } = useRouter();
  return (
    <Layout title="Alt Kategori - Oyuncu Giyim">
      <h1>Alt Kategori - {dynamicUrl}</h1>
    </Layout>
  );
}
