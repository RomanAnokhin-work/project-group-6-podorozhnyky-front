"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TravellersList from "@/components/TravellersList/TravellersList";
import { getPopularUsers } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import Container from "../Container/Container";
import css from "./OurTravellers.module.css";

const OurTravellers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchPopularUsers() {
      const data = await getPopularUsers();
      setUsers(data.users.slice(0, 4));
    }

    fetchPopularUsers();
  }, []);

  return (
    <section className={css.our_container}>
      <Container className={css.container}>
        <h2 className={css.title}>Наші Мандрівники</h2>
        <TravellersList users={users} page={1} totalPages={1} />
        <div className={css.container_btn}>
          <Link className={css.btn} href="/travellers">
            Переглянути всіх
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default OurTravellers;
