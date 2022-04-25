import { useContext, useEffect, useState } from "react";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardProductShoppingcart from "../cardProductShoppingcart";
import { DataProduct, MyContext } from "../../utils/store";
import { config } from "../../utils/config";
import style from "./style.module.css";
import Popup from "../popup";

const ShoppingCart = () => {
  const store = useContext(MyContext);
  const [visible, setVisible] = useState(false);

  console.log("store.state.shoppingCartProducts", store.state);

  const phoneNumber = () =>
    store.state.message
      ? config.numberPhone.a +
        config.numberPhone.b +
        config.numberPhone.c +
        config.numberPhone.d
      : "";

  useEffect(() => {
    if (!store.state.totalProducts) {
      setVisible(false);
    }
  }, [store.state.totalProducts]);

  return (
    <div>
      {store.state.totalProducts && (
        <div
          onClick={() => setVisible(true)}
          className={style.buttonShoppingcart}
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            color="var(--contrast)"
            width="20px"
            height="20px"
          />
          <span className={style.totalProductsFloat}>
            {store.state.totalProducts}
          </span>
        </div>
      )}
      <Popup
        onClose={() => {
          setVisible((s) => !s);
        }}
        visible={visible}
      >
        <div className={style.container}>
          <div>
            <h3 className={style.title}>
              Total de productos: {store.state.totalProducts}
            </h3>
            <ul className={style.shoppingcartList}>
              {store.state.shoppingCartProducts?.map(
                (sc: DataProduct, i: number) => (
                  <CardProductShoppingcart key={i} product={sc} />
                )
              )}
            </ul>
          </div>
          <div className={style.footer}>
            <h4 className={style.titleFooter}>
              Total a pagar: {store.state.totalPrice}
            </h4>
            <a
              target="_blank"
              className={style.buttonFooter}
              rel="noreferrer"
              href={`https://wa.me/${phoneNumber()}?text=${
                store.state.message
              }`}
            >
              Comprar con Whatsapp
            </a>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ShoppingCart;
