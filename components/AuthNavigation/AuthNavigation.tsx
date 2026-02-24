import React from "react";
import Link from "next/link";

const Navigation: React.FC = () => {
  const isAuthorized = false; 

  return (
    <nav className="navigation">
      <ul>
        <li><Link href="/">Головна</Link></li>
        <li><Link href="/stories">Історії</Link></li>
        <li><Link href="/travelers">Мандрівники</Link></li>

        {isAuthorized ? (
          <>
            <li><Link href="/profile">Мій Профіль</Link></li>
            <li><Link href="/stories/create">Опублікувати історію</Link></li>
            <li className="user-info">
              <img src="/avatar.png" alt="avatar" className="avatar" />
              <span>Ім’я користувача</span>
            </li>
            <li>
              <button className="logout-btn">➡️</button>
            </li>
          </>
        ) : (
          <>
            <li><Link href="/auth/login">Вхід</Link></li>
            <li><Link href="/auth/register">Реєстрація</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
