import Head from "next/head";

const Layout = ({ children, title = "Oyuncu Giyim" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, minimal-ui"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#ffffff"
        ></meta>
        <meta name="apple-mobile-web-app-title" content="Oyuncu Giyim"></meta>
        <meta name="application-name" content="Oyuncu Giyim"></meta>
      </Head>
      {children}
    </>
  );
};

export default Layout;
