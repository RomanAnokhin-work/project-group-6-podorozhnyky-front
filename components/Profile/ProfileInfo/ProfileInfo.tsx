"use client";
import Image from "next/image";
import css from "./ProfileInfo.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { redirect } from "next/navigation";

export default function ProfileInfo() {
  const { isAuthenticated, user } = useAuthStore();
  console.log(user);
  if (!isAuthenticated || !user) redirect("/auth/login");
  const { avatarUrl, description, name } = user;
  // const user = await getMe();

  return (
    <div className={css.profile}>
      <Image
        className={css.avatar}
        width={199}
        height={199}
        src={avatarUrl || "/images/avatar/defaultAvatar.png"}
        alt={name}
      />
      <div>
        <h1 className={css.name}>{name}</h1>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}
