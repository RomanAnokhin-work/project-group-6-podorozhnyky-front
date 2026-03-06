import { User } from "@/types/user";
import Link from "next/link";
import css from "./TravellerInfo.module.css";
import Image from "next/image";
import { useRandomAvatar } from "@/hooks/useRandomAvatar";

interface Props {
  user: User;
}

export default function TravellerInfo({ user }: Props) {
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
        <h2 className={css.name}>{user.name}</h2>
        <p className={css.description}>{user.description}</p>
      </div>
    </div>
  );
}
