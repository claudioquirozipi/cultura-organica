import Link from "next/link";
import { useContext } from "react";
import { DataProduct, myAction, MyContext } from "../../utils/store";

import { CardProductProps } from "./interface";
import style from "./style.module.css";

const CardProduct = (props: CardProductProps) => {
  const { product } = props;

  const store = useContext(MyContext);

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
      <button onClick={() => store.dispatch(myAction.removeProduct(product))}>
        -
      </button>
      {printAmount(store.state.shoppingCartProducts)}
      <button onClick={() => store.dispatch(myAction.addProduct(product))}>
        +
      </button>
    </div>
  );
  function printAmount(shoppingCartProducts: DataProduct[]) {
    console.log("fff", shoppingCartProducts);
    const tempResponse = shoppingCartProducts.filter(
      (sp: DataProduct) => sp?.slug === product.slug
    )[0]?.amount;
    let response = 0;
    if (tempResponse) response = tempResponse;
    return response;
  }
  function stringToArray(text: string) {
    const newText = JSON.stringify(text)
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll('"', "");
    return newText.split(",");
  }
};

export default CardProduct;
