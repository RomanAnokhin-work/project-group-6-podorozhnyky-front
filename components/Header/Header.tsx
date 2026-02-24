import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        Podorozhnyky
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/stories'>Stories</Link>
          </li>
          <li>
            <Link href='/travellers'>Travellers</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;