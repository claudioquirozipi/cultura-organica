import { PopupProps } from "./interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import style from "./style.module.css";
import { SyntheticEvent } from "react";

const Popup = (props: PopupProps) => {
  const { children, visible, onClose } = props;

  return (
    <div
      className={`${style.popupWrapper} ${!visible && style.popupWrapperClose}`}
      onClick={onClose}
    >
      <div
        className={style.popup}
        onClick={(e: SyntheticEvent<EventTarget>) => e.stopPropagation()}
      >
        <div onClick={onClose} className={style.close}>
          <FontAwesomeIcon icon={faXmark} width="20px" height="20px" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
