import type { GetStaticProps, NextPage } from "next";

import { HomeProps } from "../utils/interface/homePage";
import { getMarkdown } from "../utils/functions";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import CardProduct from "../components/cardProduct";

const Home: NextPage<HomeProps> = (props) => {
  const { products } = props;

  return (
    <Layout search>
      <div className={styles.container}>
        {products.map((product, i) => (
          <CardProduct key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = getMarkdown("product");
  return {
    props: {
      products,
    },
  };
};

export default Home;
