"use client";

import Image from "next/image";
import css from "./ProfileInfo.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";

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

  const { avatarUrl, description, name } = user;

  return (
    <div className={css.wrapper}>
      <Image
        src={user.avatarUrl}
        alt={user.name}
        className={css.avatar}
        width={199}
        height={199}
      />
      <div className={css.content}>
        <h2 className={css.name}>{user.name}</h2>
        <p className={css.description}>{user.description}</p>
      </div>
    </div>
  );
}