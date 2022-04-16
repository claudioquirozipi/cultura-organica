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
      <ul>
        {stringToArray(product.data.categories).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <div className={style.subTextContainer}>
        <p className={style.price}>/S {product.data.price}</p>
        <p>{product.data.availability ? "disponible" : "agotado"}</p>

        <Link href={`/${product.slug}`}>Ver más</Link>
      </div>
    </div>
  );

  function stringToArray(text: string) {
    const newText = JSON.stringify(text)
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll('"', "");
    return newText.split(",");
  }
};

export default CardProduct;
