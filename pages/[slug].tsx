import type { NextPage } from "next";
import ReactMarkdown from "react-markdown";

import { Params, ProductProps } from "../utils/interface/products";
import { getMarkdownBySlug, getPaths } from "../utils/functions";

import Layout from "../components/layout";

const ProductPage: NextPage<ProductProps> = (props) => {
  const { title, imagen, price, availability, categories, description } =
    props.data;

  return (
    <Layout>
      <h1> {title} </h1>
      <img src={imagen} alt={title} />
      <p>{price}</p>
      <p>{availability ? "disponible" : "Agotado"}</p>
      <p>categoría : </p>
      <ul>
        {categories.map((c: string, i: number) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <ReactMarkdown>{description}</ReactMarkdown>
    </Layout>
  );
};

export default ProductPage;

export async function getStaticPaths() {
  const paths = getPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: Params) {
  const data = getMarkdownBySlug(slug);
  return {
    props: {
      data,
      slug,
    },
  };
}
