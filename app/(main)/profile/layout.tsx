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
      <ProfileInfo />
      <div className={css.tabsSection}>
        <ProfileTabs />
      </div>
      <main className={css.content}>
        {children} 
      </main>
    </div>
  );
}
