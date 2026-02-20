import css from './Header.module.css';
import Link from 'next/link';

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
          <li>
            <Link href='/auth/login'>Login</Link>
                  </li>
                  <li>
            <Link href='/auth/register'>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;