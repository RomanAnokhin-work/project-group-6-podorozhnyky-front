"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import Container from "../Container/Container";
import css from "./Join.module.css";

const Join = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const buttonLabel = isAuthenticated ? "Збережені" : "Зареєструватися";
  const buttonHref = isAuthenticated ? "/profile" : "/auth/register";

  return (
    <Container className={css.container}>
      <section className={css.join} id="join">
        <div className={css.content}>
          <h2 className={css.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.description}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <Link href={buttonHref} className={css.joinLink}>
            {buttonLabel}
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Join;
