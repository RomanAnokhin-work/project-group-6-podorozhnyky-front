"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./BurgerMenu.module.css";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next-router-mock";
import Modal from "../Modal/Modal";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

interface BurgerMenuProps {
  onClose: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

export default function BurgerMenu({
  onClose,
  isAuthenticated,
  user,
}: BurgerMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (): void => {
    onClose();
  };

  const handleLogout = async (): Promise<void> => {
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

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <div className={css.logoModal}>
            <Link className={css.logo_link} href="/">
              <svg className={css.logo_icon} width="23" height="23">
                <use href="/icons.svg#icon-Favicon-1" />
              </svg>
              <p className={css.logo_text}>Подорожники</p>
            </Link>
          </div>
          <button
            type="button"
            className={css.closeButton}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <svg className={css.closeIcon} aria-hidden="true">
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>
        </div>

        <nav className={css.modalNav}>
          <ul className={css.navigation}>
            <li>
              <ThemeSwitcher />
            </li>
            <li className={css.navigationItem}>
              <Link
                href="/"
                className={`${css.navigationLink} ${pathname === "/" ? css.active : ""}`}
                onClick={handleNavClick}
              >
                Головна
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                href="/stories"
                className={`${css.navigationLink} ${pathname === "/stories" ? css.active : ""}`}
                onClick={handleNavClick}
              >
                Історії
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                href="/travellers"
                className={`${css.navigationLink} ${pathname === "/travellers" ? css.active : ""}`}
                onClick={handleNavClick}
              >
                Мандрівники
              </Link>
            </li>

            {isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/profile"
                    className={`${css.navigationLink} ${pathname === "/profile" ? css.active : ""}`}
                    onClick={handleNavClick}
                  >
                    Мій Профіль
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={css.publishButtonMobile}
                    onClick={() => {
                      handleNavClick();
                      window.location.href = "/stories/create";
                    }}
                  >
                    Опублікувати історію
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {!isAuthenticated ? (
          <div className={css.modalAuth}>
            <Link
              href="/auth/login"
              className={css.modalLogin}
              onClick={handleNavClick}
            >
              Вхід
            </Link>
            <Link
              href="/auth/register"
              className={css.modalRegister}
              onClick={handleNavClick}
            >
              Реєстрація
            </Link>
          </div>
        ) : (
          <div className={css.userInfo}>
            <Link href="/edit">
              <Image
                src={user?.avatarUrl || "/images/avatar/defaultAvatar.png"}
                alt="User avatar"
                width="32"
                height="32"
                className={css.avatar}
              />
            </Link>
            <Link href="/edit">
              <span className={css.userName}>
                {user?.name || "Імʼя користувача"}
              </span>
            </Link>
            <button
              className={css.logoutButton}
              onClick={() => setIsLogoutOpen(true)}
            >
              <svg className={css.logoutIcon}>
                <use href="/icons.svg#icon-logout" />
              </svg>
            </button>
          </div>
        )}
        {isLogoutOpen && (
          <Modal
            onClose={() => {
              setIsLogoutOpen(false);
            }}
          >
            Ви точно хочете вийти?
          </Modal>
        )}
      </div>
    </div>
  );
}
