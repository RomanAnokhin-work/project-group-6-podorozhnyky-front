// треба зробити глобальний notFound для всіх сторінок, та замінити його тут.
import { notFound } from "next/navigation";
import css from "./AuthGlobal.module.css";
import Link from "next/link";
import AuthToggle from "@/components/AuthToggle/AuthToggle";
import AuthTitle from "@/components/AuthTitle/AuthTitle";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/LoginForm/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon-1.svg",
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
    description: "Увійдіть у свій акаунт або створіть новий на Podorozhnyky.",
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

interface AuthPageProps {
  params: Promise<{ authType: string }>;
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { authType } = await params;
  // console.log(authType)
  if (authType !== "login" && authType !== "register") {
    notFound();
  }
  const isRegister = authType === "register";

  return (
    <div className={css.auth}>
      <header className={css.header}>
        <Link href="/" className={css.logo_link} aria-label="Home">
          <svg className={css.logo_icon} width="32" height="32">
            <use href="/icons.svg#icon-Favicon-1" />
          </svg>
          <p className={css.logo_text}>Подорожники</p>
        </Link>
      </header>
      <section className={css.wrap}>
        <AuthToggle />
        <AuthTitle
          title={isRegister ? "Реєстрація" : "Вхід"}
          subTitle={
            isRegister
              ? "Раді вас бачити у спільноті мандрівників!"
              : "Вітаємо знову у спільноті мандрівників!"
          }
        />
        {isRegister ? <RegistrationForm /> : <LoginForm />}
      </section>
      <footer className={css.footer}>
        <p className={css.text}>&copy; 2025 Подорожники</p>
      </footer>
    </div>
  );
}
