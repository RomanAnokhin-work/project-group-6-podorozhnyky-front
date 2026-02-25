import { User } from "@/types/user";
import Link from "next/link";
import styles from "./TravellerInfo.module.css"; // Імпортуємо стилі
import Image from "next/image";

interface TravellerInfoResponse {
  user: User;
}

export default function TravellerInfo({ user }: TravellerInfoResponse) {
  console.log(user);
  
  return (
    <div className={styles.card}>

      <Image src={user.avatarUrl} 
        alt={user.name} 
        className={styles.avatar} />

        {/* <Image src="https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff5.webp" 
        alt="Дмитро Романенко"
        className={styles.avatar} 
        width="112"
        height="112"/> */}
      
      <div className={styles.content}>
        <h2 className={styles.name}>{user.name}</h2>
        {/* <h2 className={styles.name}>Дмитро Романенко</h2> */}
        <p className={styles.description}>
          {user.description }
        </p>
        {/* <p className={styles.description}>
          Привіт! Я Дмитро. Люблю знаходити приховані перлини у кожній поїздці та ділитися ними. Світ повний дивовижних відкриттів!
        </p> */}
        
        <Link href={`/travellers/6881563901add19ee16fcff5`} className={styles.linkButton}>
          Переглянути профіль
        </Link>
        {/* <Link href={`/travellers`} className={styles.linkButton}>
          Переглянути профіль
        </Link> */}
      </div>
    </div>
  );
}