import Head from "next/head";

const Seo = ({ children, seo }) => {
  const { meta_title, meta_description, meta_keyword } = seo;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keyword} />
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

export default Seo;
