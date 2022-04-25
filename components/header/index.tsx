import Link from "next/link";

import ShoppingCart from "../shoppingCart";
import style from "./style.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <Link href="/">
        <img className={style.logo} src="/logo.jpg" alt="" />
      </Link>
      <ShoppingCart />
    </header>
  );
};

export default Header;
