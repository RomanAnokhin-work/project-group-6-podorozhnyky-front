import css from "./Button.module.css";

interface ButtonProps {
  buttonType: "submit" | "reset" | "button"
  onClick?: () => void;
  isFetching?: boolean;
  children?: React.ReactNode;
}

export default function Button({ buttonType, onClick, isFetching = false, children }: ButtonProps) {
  
  return (
    <button type={`${buttonType}`} onClick={onClick} className={css.loadMoreBtn} disabled={isFetching}>

        {children ? children : (isFetching ? "Завантаження..." : "Показати ще")}
    </button>
  );
}
