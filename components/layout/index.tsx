import Head from "next/head";

import { LayoutProps } from "./interface";
import style from "./style.module.css";
import Header from "../header";
import Footer from "../footer";

const Layout = (props: LayoutProps) => {
  const { children, search } = props;
  return (
    <div className={style.container}>
      <Head>
        <title>Cultura Organica|</title>
        <meta name="description" content="Tienda de productos naturales" />
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <Header search={search} />

      <div className={style.childrenContainer}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
