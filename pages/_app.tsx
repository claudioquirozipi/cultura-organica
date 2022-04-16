import type { AppProps } from "next/app";
import { useReducer, useState } from "react";

import { initialState, MyContext, reducer } from "../utils/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </MyContext.Provider>
  );
}

export default MyApp;
