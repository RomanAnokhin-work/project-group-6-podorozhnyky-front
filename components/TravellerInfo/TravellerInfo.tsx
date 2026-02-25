import { User } from "@/types/user";
import Link from "next/link";
import styles from "./TravellerInfo.module.css"; // Імпортуємо стилі

interface TravellerInfoResponse {
  user: User;
}

export default function TravellerInfo({ user }: TravellerInfoResponse) {
  console.log(user);

  return (
    <div className={styles.card}>
      <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />

      <div className={styles.content}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.description}>
          {user.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."}
        </p>

        {/* <Link href={`/travellers/${user._id}`} className={styles.linkButton}>
          Переглянути профіль
        </Link> */}
        <Link href={`/travellers`} className={styles.linkButton}>
          Переглянути профіль
        </Link>
      </div>
    </div>
  );
}
