import { useContext, useState } from "react";
import type { GetStaticProps, NextPage } from "next";

import { getMarkdown } from "../utils/functions";
import { Data, HomeProps } from "../utils/interface/homePage";
import { Filter } from "../components/filter/interface";
import CardProduct from "../components/cardProduct";
import FilterProducts from "../components/filter";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { MyContext } from "../utils/store";

const Home: NextPage<HomeProps> = (props) => {
  const { products, categories } = props;

  const store = useContext(MyContext);

  const [filter, setFilter] = useState<Filter>({});

  function productsFiltered(products: Data[]) {
    const newProducts = products
      .filter((p) => (filter.availability ? p.data.availability && p : p))
      .filter((p) =>
        filter.text
          ? p.data.title.toLowerCase().includes(filter.text.toLowerCase()) && p
          : p
      )
      .filter((p) => (filter.min ? filter.min <= p.data.price && p : p))
      .filter((p) => (filter.max ? filter.max >= p.data.price && p : p))
      .filter((p) =>
        filter.categories?.length
          ? stringToArray(p.data.categories).filter((c) =>
              filter.categories?.includes(c)
            ).length === filter.categories.length && p
          : p
      );
    return newProducts;
  }

  return (
    <Layout search>
      <FilterProducts onChange={setFilter} categories={categories} />

      <div className={styles.container}>
        {productsFiltered(products).map((product, i) => (
          <CardProduct key={i} product={product} />
        ))}
      </div>
    </Layout>
  );

  function stringToArray(text: string) {
    const newText = JSON.stringify(text)
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll('"', "");
    return newText.split(",");
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const products = getMarkdown("product");
  const categories = getMarkdown("categories");
  return {
    props: {
      products,
      categories,
    },
  };
};

export default Home;
