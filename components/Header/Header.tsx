'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Container from '../Container/Container';

export default function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isBurgerOpen) return;

    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('bodyLock');

    return () => {
      document.body.classList.remove('bodyLock');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [isBurgerOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBurgerOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isBurgerOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBurgerOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isBurgerOpen]);

  return (
    <>
      <header className={css.header}>

        <Container className={css.container}>
         
          <Link href="/" className={css.logo_link} aria-label="Home">
            <svg>
              <use href="/icons.svg#icon-Company-Logo" />
            </svg>
          </Link>

          <nav aria-label="Main navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li>
                <Link href="/" className={css.navigationLink}>
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/stories" className={css.navigationLink}>
                  Історії
                </Link>
              </li>
              <li>
                <Link href="/travellers" className={css.navigationLink}>
                  Мандрівники
                </Link>
              </li>
            </ul>

            <AuthNavigation variant="desktop" />
          </nav>

          <div className={css.tabletActions}>
            <Link href="/stories/create" className={css.publishButton}>
              Опублікувати історію
            </Link>
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
          </div>

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
          </Container>
      </header>

      {isBurgerOpen && (
        <BurgerMenu onClose={() => setIsBurgerOpen(false)} />
      )}
    </>
  );
}
