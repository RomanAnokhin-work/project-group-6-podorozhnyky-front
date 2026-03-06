"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: {
    icon: "/favicon-1.svg"
  },
  title: "Увійти або Зареєструватися | Podorozhnyky",
  description:
    "Увійдіть у свій акаунт або створіть новий на Podorozhnyky, щоб додавати та переглядати свої історії подорожей.",

  openGraph: {
    title: "Увійти або Зареєструватися | Podorozhnyky",
    description:
      "Увійдіть у свій акаунт або створіть новий на Podorozhnyky, щоб ділитися своїми подорожами.",
    url: "https://project-group-6-podorozhnyky-front.vercel.app/auth", 
    siteName: "Podorozhnyky",
    images: [
      {
        url: "/images/cover/cover.jpg", 
        width: 1200,
        height: 630,
        alt: "Login/Register Podorozhnyky",
      },
    ],
    type: "website",
    locale: "uk_UA",
  },

  twitter: {
    card: "summary_large_image",
    title: "Увійти або Зареєструватися | Podorozhnyky",
    description:
      "Увійдіть у свій акаунт або створіть новий на Podorozhnyky.",
    images: ["/images/cover/cover.jpg"],
  },

  robots: {
    index: false, 
    follow: false,
  },

  alternates: {
    canonical: "https://project-group-6-podorozhnyky-front.vercel.app/auth",
  },
};

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div>{children}</div>;
};

export default AuthLayout;
