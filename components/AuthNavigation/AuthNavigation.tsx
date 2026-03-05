"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import Modal from "../Modal/Modal";

type AuthNavigationProps = {
  variant?: "desktop" | "modal";
  onClose?: () => void;
  isAuthenticated: boolean;
  user: User | null;
};

export default function AuthNavigation({
  variant = "desktop",
  onClose,
  isAuthenticated,
  user,
}: AuthNavigationProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const handleClick = () => {
    if (onClose) onClose();
  };

  if (isAuthenticated) {
    return (
      <div className={variant === "desktop" ? css.desktopAuth : css.modalAuth}>
        <div className={css.userInfo}>
          <Image
            src={user?.avatarUrl || "/images/avatar/defaultAvatar.png"}
            alt="User avatar"
            width="32"
            height="32"
            className={css.avatar}
          />
          <span className={css.userName}>
            {user?.name || "Імʼя користувача"}
          </span>
        </div>
        <button
          type="button"
          className={css.logoutButton}
          onClick={() => setIsLogoutOpen(true)}
        >
          <svg className={css.logoutIcon}>
            <use href="/icons.svg#icon-logout" />
          </svg>
        </button>
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
    );
  }

  return (
    <div className={variant === "desktop" ? css.desktopAuth : css.modalAuth}>
      <Link
        href="/auth/login"
        className={css.loginButton}
        onClick={handleClick}
      >
        Вхід
      </Link>
      <Link
        href="/auth/register"
        className={css.registerButton}
        onClick={handleClick}
      >
        Реєстрація
      </Link>
    </div>
  );
}
