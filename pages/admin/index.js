import Layout from "../../components/Layout";

export default function AdminHome() {
  return (
    <Layout title="Admin - Oyuncu Giyim">
      <h1>Admin-home</h1>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  res.writeHead(301, {
    Location: "/admin/dashboard",
  });
  res.end();
}
