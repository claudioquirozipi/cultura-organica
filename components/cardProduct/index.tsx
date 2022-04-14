import ReactMarkdown from "react-markdown";
import Link from "next/link";

import { CardProductProps } from "./interface";
import style from "./style.module.css";

const CardProduct = (props: CardProductProps) => {
  const { product } = props;

  return (
    <div className={style.card}>
      <img
        className={style.image}
        src={product.data.imagen}
        alt={product.data.title}
      />
      <h2 className={style.title}>{product.data.title}</h2>
      <div className={style.subTextContainer}>
        <p className={style.price}>/S {product.data.price}</p>

        <Link href={`/${product.slug}`}>Ver más</Link>
      </div>
    </div>
  );
};
function stringToArray(category: string) {
  const response = category.replaceAll("[", "").replaceAll("]", "").split(",");
  return response;
}

export default CardProduct;
