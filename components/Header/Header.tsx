'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';
  }, [isBurgerOpen]);

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.container}`}>
          <Link href="/" className={css.logo_link} aria-label="Home">
            <svg className={css.logo_icon} width="30" height="30">
              <use href="/icons.svg#icon-Favicon" />
            </svg>
            <p className={css.logo_text}>Подорожники</p>
          </Link>

          <nav aria-label="Main navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li><Link href="/" className={css.navigationLink}>Головна</Link></li>
              <li><Link href="/stories" className={css.navigationLink}>Історії</Link></li>
              <li><Link href="/travellers" className={css.navigationLink}>Мандрівники</Link></li>
              {isAuthenticated && (
                <>
                  <li><Link href="/profile" className={css.navigationLink}>Мій Профіль</Link></li>
                  <li>
                    <button
                      type="button"
                      className={css.publishButton}
                      onClick={() => (window.location.href = '/stories/create')}
                    >
                      Опублікувати історію
                    </button>
                  </li>
                </>
              )}
            </ul>

            <AuthNavigation
              variant="desktop"
              isAuthenticated={isAuthenticated}
            />
          </nav>

          <button
            type="button"
            className={css.burgerButton}
            onClick={() => setIsBurgerOpen(true)}
            aria-label="Open menu"
          >
            <svg className={css.burgerIcon} aria-hidden="true">
              <use href="/icons.svg#icon-menu" />
            </svg>
          </button>

          <button
            type="button"
            className={css.mobileBurger}
            onClick={() => setIsBurgerOpen(true)}
            aria-label="Open menu"
          >
            <svg className={css.burgerIcon} aria-hidden="true">
              <use href="/icons.svg#icon-menu" />
            </svg>
          </button>
        </div>
      </header>

      {isBurgerOpen && (
        <BurgerMenu
          onClose={() => setIsBurgerOpen(false)}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
}
