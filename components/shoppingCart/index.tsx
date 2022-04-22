import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DataProduct, myAction, MyContext } from "../../utils/store";

const ShoppingCart = () => {
  const store = useContext(MyContext);

  return (
    <div>
      <div style={{ width: "20px", height: "20px" }}>
        <FontAwesomeIcon icon={faShoppingCart} color="var(--third)" />
      </div>
      <ul>
        {store.state.shoppingCartProducts?.map((sc: DataProduct, i: number) => (
          <li key={i}>
            <h4>{sc.data.title}</h4>
            <p>{`${sc.amount} => ${sc.amount * sc.data.price}`}</p>
            <div style={{ width: "20px", height: "20px" }}>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() =>
                  store.dispatch(myAction.removeAllProducts(sc.slug))
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
