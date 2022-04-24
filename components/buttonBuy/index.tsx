import { useContext } from "react";
import Image from "next/image";

import { MyContext } from "../../utils/store";
import { config } from "../../utils/config";
import style from "./style.module.css";

const ButtonBuy = () => {
  const store = useContext(MyContext);

  const phoneNumber = () =>
    store.state.message
      ? config.numberPhone.a +
        config.numberPhone.b +
        config.numberPhone.c +
        config.numberPhone.d
      : "";

  return store.state.message ? (
    <a
      target="_blank"
      className={style.container}
      rel="noreferrer"
      href={`https://wa.me/${phoneNumber()}?text=${store.state.message}`}
    >
      <Image src={"/socialmedia/whatsapp.png"} width={70} height={70} />
    </a>
  ) : null;
};

export default ButtonBuy;
