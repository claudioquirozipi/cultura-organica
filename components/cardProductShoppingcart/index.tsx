import { useContext } from "react";
import Link from "next/link";

import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DataProduct, myAction, MyContext } from "../../utils/store";
import { CardProductShoppingcartProps } from "./interface";
import style from "./style.module.css";

const CardProductShoppingcart = (props: CardProductShoppingcartProps) => {
  const { product } = props;

  const store = useContext(MyContext);

  return (
    <li
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

      <h2 className={style.title}>
        <Link href={`/${product.slug}`}>{product.data.title}</Link>
      </h2>
      <div className={style.priceContainer}>
        <p className={style.price}>
          Total /S{" "}
          {product.data.price * printAmount(store.state.shoppingCartProducts)}
        </p>
        <p className={style.price}>/S {product.data.price}</p>
      </div>
      <div className={style.buttonsContainer}>
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
        <div className={style.buttonIcon}>
          <FontAwesomeIcon
            icon={faTrash}
            width="20px"
            height="20px"
            color="var(--error)"
            onClick={() =>
              store.dispatch(myAction.removeAllProducts(product.slug))
            }
          />
        </div>
      </div>
    </li>
  );
  function printAmount(shoppingCartProducts: DataProduct[]) {
    const tempResponse = shoppingCartProducts.filter(
      (sp: DataProduct) => sp?.slug === product.slug
    )[0]?.amount;
    let response = 0;
    if (tempResponse) response = tempResponse;
    return response;
  }
};

export default CardProductShoppingcart;
