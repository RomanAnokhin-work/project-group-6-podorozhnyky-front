import css from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void; 
  isFetching?: boolean; 
}

export default function Button({ onClick, isFetching = false }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={css.loadMoreBtn}
      disabled={isFetching} 
    >
      {isFetching ? "Завантаження..." : "Показати ще"}
    </button>
  );
}