"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import css from "./AuthToggle.module.css";

export default function AuthTabs() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className={css.tabsContainer}>
      <Link
        href="/auth/register"
        className={clsx(css.tab, pathname === "/auth/register" && css.active)}
      >
        Реєстрація
      </Link>
      <Link
        href="/auth/login"
        className={clsx(css.tab, pathname === "/auth/login" && css.active)}
      >
        Вхід
      </Link>
    </div>
  );
}
