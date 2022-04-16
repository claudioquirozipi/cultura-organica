import { createContext } from "react";
import { string } from "yup";
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
}
export const initialState: InitialState = {
  shoppingCartProducts: [],
  message: "",
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
      return { shoppingCartProducts: response };

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

      return { shoppingCartProducts: responseRemove };
    case "removeAllProducts":
      return {};
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
