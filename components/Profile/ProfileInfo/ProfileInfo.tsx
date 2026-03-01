import Image from "next/image";
import css from "./ProfileInfo.module.css"
import { getMe } from "@/lib/api/serverApi";


export default async function ProfileInfo(){
    const {avatarUrl, description, name} = await getMe();
    const user = await getMe();
    console.log(user);


    return (
    <div className={css.profile}>
        <Image 
          className={css.avatar} 
          width={199} 
          height={199} 
          src={avatarUrl} 
          alt={name}
        />
        <div>
          <h1 className={css.name}>{name}</h1>
          <p className={css.description}>{description}</p>
        </div>
      </div>
      )
}