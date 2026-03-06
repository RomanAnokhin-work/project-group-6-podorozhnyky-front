import { User } from "@/types/user";
import Link from "next/link";
import styles from "./TravellersListItem.module.css";
import Image from "next/image";
import { useRandomAvatar } from "@/hooks/useRandomAvatar";

interface Props {
  user: User;
}

export default function TravellersListItem({ user }: Props) {
  let avatarSrc: string;
  if (user.avatarUrl) {
    avatarSrc = user.avatarUrl;
  } else {
    const { seedString, bgColor } = useRandomAvatar(user._id, user.name);

    avatarSrc = `https://api.dicebear.com/9.x/lorelei/svg?seed=${seedString}&backgroundColor=${bgColor}`;
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarCheckers}></div>
        <Image
          src={avatarSrc}
          alt={user.name}
          width={112}
          height={112}
          className={styles.avatar}
          priority={false}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.description}>{user.description}</p>
        <Link href={`/travellers/${user._id}`} className={styles.linkButton}>
          Переглянути профіль
        </Link>
      </div>
    </div>
  );
}
