import { getMe, getTravellerById } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
export default async function Profile() {
  const { avatarUrl, description, name } = await getMe();
  // const user = await getMe();

  return (
    <section>
      <div>
        <Image width="199" height="199" src={avatarUrl} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
