import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div>Sayfa Bulunamadı</div>
      <Link href="/">
        <a>Anasayfaya Gitmek İçin Tıklayın</a>
      </Link>
    </>
  );
}
