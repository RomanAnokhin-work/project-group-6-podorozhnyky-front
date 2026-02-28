"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user,  } = useAuthStore();
const logout = useAuthStore((state) => state.clearIsAuthenticated);
  const isAuth = !!user;

  // 🔒 scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // ⌨️ ESC close
  useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") setOpen(false);
};

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => setOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path
              d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z"
              fill="#4CAF50"
            />
          </svg>
          Подорожники
        </Link>

        {/* OVERLAY */}
        {open && <div className={styles.overlay} onClick={handleClose}></div>}

        {/* NAV */}
        <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
          <Link
            href="/"
            onClick={handleClose}
            className={isActive("/") ? styles.active : ""}
          >
            Головна
          </Link>

          <Link
            href="/stories"
            onClick={handleClose}
            className={isActive("/stories") ? styles.active : ""}
          >
            Історії
          </Link>

          <Link
            href="/travelers"
            onClick={handleClose}
            className={isActive("/travelers") ? styles.active : ""}
          >
            Мандрівники
          </Link>

          {isAuth && (
            <Link
              href="/profile"
              onClick={handleClose}
              className={isActive("/profile") ? styles.active : ""}
            >
              Мій профіль
            </Link>
          )}

          {/* MOBILE AUTH */}
          {!isAuth && (
            <div className={styles.mobileAuth}>
              <Link href="/login" onClick={handleClose}>
                Вхід
              </Link>
              <Link href="/register" onClick={handleClose} className={styles.primary}>
                Реєстрація
              </Link>
            </div>
          )}

          {isAuth && (
            <div className={styles.mobileAuth}>
              <Link href="/create" onClick={handleClose} className={styles.primary}>
                Опублікувати історію
              </Link>
              <button
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Вийти
              </button>
            </div>
          )}
        </nav>

        {/* RIGHT */}
        <div className={styles.right}>
          {!isAuth && (
            <>
              <Link href="/login" className={styles.login}>
                Вхід
              </Link>
              <Link href="/register" className={styles.primary}>
                Реєстрація
              </Link>
            </>
          )}

          {isAuth && (
            <>
              <Link href="/create" className={styles.primary}>
                Опублікувати історію
              </Link>

              <div className={styles.user}>
                <div className={styles.avatar}></div>
                <span>{user.name}</span>
                <button onClick={logout}>⎋</button>
              </div>
            </>
          )}
        </div>

        {/* BURGER */}
        <button className={styles.burger} onClick={() => setOpen(!open)}>
          <span className={`${styles.line} ${open ? styles.line1 : ""}`}></span>
          <span className={`${styles.line} ${open ? styles.line2 : ""}`}></span>
          <span className={`${styles.line} ${open ? styles.line3 : ""}`}></span>
        </button>
      </div>
    </header>
  );
}