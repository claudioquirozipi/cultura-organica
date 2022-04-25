import { createContext } from "react";
import { Data } from "./interface/homePage";
import { Product } from "./interface/products";

export interface DataProduct {
  data: Product;
  slug: string;
  amount: number;
}
interface InitialState {
  shoppingCartProducts: DataProduct[];
  message: string;
  totalProducts: number;
  totalPrice: number;
}
export const initialState: InitialState = {
  shoppingCartProducts: [],
  message: "",
  totalProducts: 0,
  totalPrice: 0,
};

const getMessage = (shoppingCartProducts: DataProduct[]) => {
  let totalPrice = 0;
  let totalProducts = 0;
  const message = shoppingCartProducts.map((scp) => {
    totalPrice += scp.data.price * scp.amount;
    totalProducts += scp.amount;
    return `=>${scp.data.title} /S. ${scp.data.price} => ${scp.amount}-%0A`;
  });
  return [
    `Hola Deseo comprar estos productos: %0A,${message}Total a pagar: ${totalPrice} %0A Total de productos: ${totalProducts}`,
    totalPrice,
    totalProducts,
  ];
};
export const MyContext = createContext<any>({});
export function reducer(state: InitialState, action: any) {
  switch (action.type) {
    case "addProduct":
      const newShoppingCartProducts: DataProduct[] =
        state.shoppingCartProducts.filter(
          (sc: DataProduct) => sc.slug === action.payload.slug
        );
      let response: DataProduct[] = [];
      if (!newShoppingCartProducts.length) {
        response = [
          ...state.shoppingCartProducts,
          { ...action.payload, amount: 1 },
        ];
      } else {
        response = state.shoppingCartProducts.map((sc: DataProduct) =>
          sc.slug === action.payload.slug
            ? {
                ...action.payload,
                amount: sc.amount + 1,
              }
            : sc
        );
      }
      const [message, totalPrice, totalProducts] = getMessage(response);
      return {
        shoppingCartProducts: response,
        message,
        totalPrice,
        totalProducts,
      };

    case "removeProduct":
      const newShoppingCartProductsRemove: DataProduct[] =
        state.shoppingCartProducts.filter(
          (sc: DataProduct) => sc.slug === action.payload.slug
        );
      let responseRemove: DataProduct[] = [];
      if (newShoppingCartProductsRemove.length) {
        responseRemove = state.shoppingCartProducts
          .map((sc: DataProduct) => {
            if (sc.slug === action.payload.slug) {
              if (sc.amount > 1) {
                return {
                  ...action.payload,
                  amount: sc.amount - 1,
                };
              }
              return {
                ...action.payload,
                amount: 0,
              };
            } else {
              return sc;
            }
          })
          .filter((sc: DataProduct) => sc.amount > 0);
      } else {
        responseRemove = [...state.shoppingCartProducts];
      }
      const [message2, totalPrice2, totalProducts2] =
        getMessage(responseRemove);
      return {
        shoppingCartProducts: responseRemove,
        message: message2,
        totalPrice: totalPrice2,
        totalProducts: totalProducts2,
      };
    case "removeAllProducts":
      const newResponse = state.shoppingCartProducts.filter(
        (sc: DataProduct) => sc.slug !== action.payload
      );
      const [message3, totalPrice3, totalProducts3] = getMessage(newResponse);
      return {
        shoppingCartProducts: newResponse,
        message: message3,
        totalPrice: totalPrice3,
        totalProducts: totalProducts3,
      };
    default:
      throw new Error();
  }
}

export const myAction = {
  addProduct: (payload: Data) => ({
    type: "addProduct",
    payload,
  }),

  removeProduct: (payload: Data) => ({
    type: "removeProduct",
    payload,
  }),
  removeAllProducts: (payload: string) => ({
    type: "removeAllProducts",
    payload,
  }),
};
