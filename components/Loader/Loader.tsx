import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.overlay}>
      <div className={css.loaderBox}>
        <span className={css.spinner}></span>
        <p className={css.text}>Завантаження...</p>
      </div>
    </div>
  );
}
