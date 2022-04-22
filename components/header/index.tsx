import Link from "next/link";
import ShoppingCart from "../shoppingCart";
import { HeaderProps } from "./interface";
import style from "./style.module.css";

const Header = (props: HeaderProps) => {
  const { search } = props;
  return (
    <header className={style.header}>
      <Link href="/">
        <img className={style.logo} src="/logo.jpg" alt="" />
      </Link>
      {search && <ShoppingCart />}
    </header>
  );
};

export default Header;
