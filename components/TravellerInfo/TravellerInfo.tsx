import { User } from "@/types/user";
import Link from "next/link";
import css from "./TravellerInfo.module.css";
import Image from "next/image";

interface Props {
  user: User;
}

export default function TravellerInfo({ user }: Props) {
  return (
    <div className={styles.card}>
      <Image src={user.avatarUrl} 
        alt={user.name} 
        className={styles.avatar} 
        width="112"
        height="112"/>

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
