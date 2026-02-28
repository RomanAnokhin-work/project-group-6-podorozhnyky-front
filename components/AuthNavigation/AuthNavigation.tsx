'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';

type AuthNavigationProps = {
  variant?: 'desktop' | 'modal';
  onClose?: () => void;
  isAuthenticated: boolean;
};

export default function AuthNavigation({
  variant = 'desktop',
  onClose,
  isAuthenticated,
}: AuthNavigationProps) {
  const handleClick = () => {
    if (onClose) onClose();
  };
  if (isAuthenticated) {
    return (
      <div className={variant === 'desktop' ? css.desktopAuth : css.modalAuth}>
        <div className={css.userInfo}>
          <img src="/avatar.png" alt="User avatar" className={css.avatar} />
          <span className={css.userName}>Імʼя Користувача</span>
        </div>
        <button
          type="button"
          className={css.logoutButton}
          onClick={() => {
          }}
        >
          <svg className={css.logoutIcon}>
            <use href="/icons.svg#icon-logout" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={variant === 'desktop' ? css.desktopAuth : css.modalAuth}>
      <Link href="/auth/login" className={css.loginButton} onClick={handleClick}>
        Вхід
      </Link>
      <Link href="/auth/register" className={css.registerButton} onClick={handleClick}>
        Реєстрація
      </Link>
    </div>
  );
}
