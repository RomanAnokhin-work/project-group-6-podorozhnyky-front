"use client";

import Image from "next/image";
import css from "./ProfileInfo.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { useRandomAvatar } from "@/hooks/useRandomAvatar";
import Button from "@/components/Button/Button";
import Link from "next/link";

export default function ProfileInfo() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      getMe()
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("Помилка завантаження профілю:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) return <div>Завантаження...</div>;
  if (!user) return <div>Користувача не знайдено</div>;

  const { description, name } = user;
  let avatarSrc: string;
  if (user.avatarUrl) {
    avatarSrc = user.avatarUrl;
  } else {
    const { seedString, bgColor } = useRandomAvatar(user._id, user.name);

    avatarSrc = `https://api.dicebear.com/9.x/lorelei/svg?seed=${seedString}&backgroundColor=${bgColor}`;
  }

  return (
    <div className={css.wrapper}>
      <Image
        src={avatarSrc}
        alt={user.name}
        className={css.avatar}
        width={199}
        height={199}
      />
      <div className={css.content}>
        <h2 className={css.name}>{name}</h2>
        <p className={css.description}>{description}</p>
        <Link href="/edit">
          <Button buttonType="button">Редагувати профіль</Button>
        </Link>
      </div>
    </div>
  );
}
