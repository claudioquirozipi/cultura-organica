import { useContext } from "react";
import Link from "next/link";

import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DataProduct, myAction, MyContext } from "../../utils/store";
import { CardProductProps } from "./interface";
import style from "./style.module.css";

const CardProduct = (props: CardProductProps) => {
  const { product } = props;

  const store = useContext(MyContext);

  return (
    <div
      className={`${style.card} ${
        !product.data.availability && style.cardDisable
      }`}
    >
      <img
        className={style.image}
        src={
          product.data.imagen.includes("http")
            ? product.data.imagen
            : `/${product.data.imagen}`
        }
        alt={product.data.title}
        width={110}
        height={110}
      />

      <ul className={style.chipGroup}>
        {stringToArray(product.data.categories).map((c, i) => (
          <li key={i} className={style.chip}>
            {c}
          </li>
        ))}
      </ul>
      <h2 className={style.title}>
        <Link href={`/${product.slug}`}>{product.data.title}</Link>
      </h2>

      <p className={style.price}>/S {product.data.price}</p>

      {product.data.availability && (
        <>
          {printAmount(store.state.shoppingCartProducts) > 0 ? (
            <div className={style.buttonContainer}>
              <div
                className={style.buttonIcon}
                onClick={() => store.dispatch(myAction.removeProduct(product))}
              >
                <FontAwesomeIcon icon={faMinus} width="20px" height="20px" />
              </div>
              {printAmount(store.state.shoppingCartProducts)}
              <div
                className={style.buttonIcon}
                onClick={() => store.dispatch(myAction.addProduct(product))}
              >
                <FontAwesomeIcon icon={faPlus} width="20px" height="20px" />
              </div>
            </div>
          ) : (
            <button
              className={style.button}
              onClick={() => store.dispatch(myAction.addProduct(product))}
            >
              Comprar
            </button>
          )}
        </>
      )}
    </div>
  );
  function printAmount(shoppingCartProducts: DataProduct[]) {
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
