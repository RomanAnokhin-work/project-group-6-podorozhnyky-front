"use client";
import { createPortal } from "react-dom";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import css from "./AuthNavModal.module.css";

interface AuthNavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthNavModal({ isOpen, onClose }: AuthNavModalProps) {
  const router = useRouter();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const goToLogin = () => {
    onClose();
    router.push("/auth/login");
  };

  const goToRegister = () => {
    onClose();
    router.push("/auth/register");
  };
  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon} width="24" height="24">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <div className={css.contentWrapper}>
          <h2 className={css.title}>Помилка під час збереження</h2>
        <p className={css.text}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису
          — зареєструйтесь.
        </p>
        </div>
        
        <div className={css.actions}>
          <button className={css.loginBtn} onClick={goToLogin}>
            Увійти
          </button>

          <button className={css.registerBtn} onClick={goToRegister}>
            Зареєструватись
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default AuthNavModal;
