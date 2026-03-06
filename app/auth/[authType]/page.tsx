// треба зробити глобальний notFound для всіх сторінок, та замінити його тут.
import { notFound } from "next/navigation";
import css from "./AuthGlobal.module.css";
import Link from "next/link";
import AuthToggle from "@/components/AuthToggle/AuthToggle";
import AuthTitle from "@/components/AuthTitle/AuthTitle";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import LoginForm from "@/components/LoginForm/LoginForm";

interface AuthPageProps {
  params: Promise<{ authType: string }>;
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { authType } = await params;
  
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
