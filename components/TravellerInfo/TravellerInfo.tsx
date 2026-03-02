import { User } from "@/types/user";
import Link from "next/link";
import css from "./TravellerInfo.module.css";
import Image from "next/image";

interface Props {
  user: User;
}

export default function TravellerInfo({ user }: Props) {
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
