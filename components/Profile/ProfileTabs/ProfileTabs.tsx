"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import css from "./ProfileTabs.module.css";

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className={css.container}>
      <div className={css.tabsWrapper}>
        <Link
          href="/profile/saved"
          className={clsx(css.tab, pathname === "/profile/saved" && css.active)}
        >
          Збережені історії
        </Link>
        <Link
          href="/profile/own"
          className={clsx(css.tab, pathname === "/profile/own" && css.active)}
        >
          Мої історії
        </Link>
      </div>
    </div>
  );
};
