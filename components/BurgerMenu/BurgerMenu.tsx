'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './BurgerMenu.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

interface BurgerMenuProps {
  onClose: () => void;
}

export default function BurgerMenu({ onClose }: BurgerMenuProps) {
  const pathname = usePathname();

  const handleNavClick = () => {
    onClose();
  };

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <div className={css.logoModal}>
           <Link className={css.logo_link} href="/">
                <svg className={css.logo_icon} width="23" height="23">
                <use href="/icons.svg#icon-Company-Logo"/>
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
              <use href="/icons.svg#icon-close"/>
            </svg>
          </button>
        </div>

        <nav className={css.modalNav}>
          <ul className={css.navigation}>
            <li>
              <Link
                href="/"
                className={`${css.navigationLink} ${pathname === '/' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Головна
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className={`${css.navigationLink} ${pathname === '/stories' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Історії
              </Link>
            </li>
            <li>
              <Link
                href="/travellers"
                className={`${css.navigationLink} ${pathname === '/travellers' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Мандрівники
              </Link>
            </li>
          </ul>
        </nav>

        <AuthNavigation variant="modal" onClose={onClose} />
      </div>
    </div>
  );
}
