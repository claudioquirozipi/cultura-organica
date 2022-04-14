import style from "./style.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div>
        <p className={style.information}>Dirección: retablo ... </p>
        <p className={style.information}> retablo ... </p>
        <p className={style.information}>correo: culturaOrganica.com</p>
      </div>
      <div>
        <p className={style.information}>redes sociales</p>
      </div>
    </footer>
  );
};

export default Footer;
