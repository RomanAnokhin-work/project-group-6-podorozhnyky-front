import { User } from "@/types/user";
import Link from "next/link";
import css from "./TravellerInfo.module.css";
import Image from "next/image";

interface Props {
  user: User;
}

export default function TravellerInfo({ user }: Props) {
  return (
    <div className={css.card}>
      <Image src={user.avatarUrl} 
        alt={user.name} 
        className={css.avatar} 
        width="112"
        height="112"/>

      <div className={css.content}>
        <h2 className={css.name}>{user.name}</h2>
        <p className={css.description}>{user.description}</p>        
        <Link href={`/travellers/${user._id}`} className={css.linkButton}>
          Переглянути профіль
        </Link>
      </div>
    </div>
  );
}
