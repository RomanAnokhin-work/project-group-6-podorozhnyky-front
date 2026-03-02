import { ReactNode } from 'react';
import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs';
import css from './ProfilePage.module.css';
import { redirect } from 'next/navigation';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';

interface Props {
  children: ReactNode;
  saved: ReactNode; // Це контент з папки @saved
  own: ReactNode;   // Це контент з папки @own
}

export default function ProfileLayout({ children, saved, own }: Props) {
  // children тут буде порожнім або містити результат redirect
  redirect('/profile/saved');
  return (
    <div className={css.profileContainer}>
      {/* Верхня частина: фото, ім'я, опис */}

      <ProfileInfo/>
      <ProfileTabs />

      <main className={css.content}>
        {/* Next.js сам підставить сюди потрібну папку (@saved або @own) 
            залежно від URL адреси */}
        {children} 
      </main>
    </div>
  );
}