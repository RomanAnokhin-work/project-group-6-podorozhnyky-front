import { ReactNode } from 'react';
import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';
import css from './ProfilePage.module.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: {
    icon: "/favicon-1.svg"
  },
  title: "Мій профіль | Podorozhnyky",
  description:
    "Переглядайте та редагуйте свій профіль на Podorozhnyky. Додавайте свої історії подорожей та діліться пригодами з іншими мандрівниками.",

  openGraph: {
    title: "Мій профіль | Podorozhnyky",
    description:
      "Переглядайте та редагуйте свій профіль на Podorozhnyky. Додавайте свої історії подорожей та діліться пригодами.",
    url: "https://project-group-6-podorozhnyky-front.vercel.app/profile",
    siteName: "Podorozhnyky",
    images: [
      {
        url: "/images/cover/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Профіль Podorozhnyky",
      },
    ],
    type: "website",
    locale: "uk_UA",
  },

  twitter: {
    card: "summary_large_image",
    title: "Мій профіль | Podorozhnyky",
    description:
      "Переглядайте та редагуйте свій профіль на Podorozhnyky.",
    images: ["/images/cover/cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://project-group-6-podorozhnyky-front.vercel.app/profile",
  },
};

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
