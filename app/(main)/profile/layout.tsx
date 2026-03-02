import { ReactNode } from 'react';
import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';
import css from './ProfilePage.module.css';

interface Props {
  children: ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <div className={css.profileContainer}>
      {/* Серверний компонент, який сам завантажить дані Анатолія */}
      <ProfileInfo />
      
      {/* Перемикач вкладок */}
      <ProfileTabs />

      <main className={css.content}>
        {/* Сюди потраплятиме контент із saved/page.tsx або own/page.tsx */}
        {children} 
      </main>
    </div>
  );
}
