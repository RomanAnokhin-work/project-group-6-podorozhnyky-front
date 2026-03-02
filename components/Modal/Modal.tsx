"use client";

import { useEffect, useState, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../lib/api/clientApi";
import css from "./Modal.module.css";
import { useAuthStore } from "@/lib/store/authStore";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Перевірка чи модалка відкрита (блокування скролу)
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("bodyLock");

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("bodyLock");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      useAuthStore.getState().clearIsAuthenticated();
      localStorage.removeItem("user");
      onClose();
      router.push("/");
    } catch (error) {
      console.error("Помилка при виході:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modalContainer}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          {/* СВГ як посилання на спрайт */}
          <svg width="24" height="24" className={css.closeIcon}>
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>

        <div className={css.content}>
          <h2 className={css.title}>Ви точно хочете вийти?</h2>
          <p className={css.text}>Ми будемо сумувати за вами!</p>
        </div>

        <div className={css.buttonGroup}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Відмінити
          </button>
          <button
            type="button"
            className={css.confirmButton}
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Виходимо..." : "Вийти"}
          </button>
        </div>
      </div>
    </div>
  );
}
