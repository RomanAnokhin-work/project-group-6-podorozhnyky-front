import { User } from "@/types/user";
import Link from "next/link";
import styles from "./TravellersListItem.module.css"; // Імпортуємо стилі
import Image from "next/image";

interface Props {
  user: User;
}

export default function TravellersListItem({ user }: Props) {
  return (
    <div className={styles.card}>
      <Image
        src={user.avatarUrl}
        alt={user.name}
        className={styles.avatar}
        width={100}
        height={100}
      />
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
