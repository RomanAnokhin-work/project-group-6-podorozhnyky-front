"use client";

import { useState } from "react";
import clsx from "clsx";
import css from "./ProfileTabs.module.css";

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<"saved" | "my">("saved");

  return (
    <div className={css.container}>
      <div className={css.tabsWrapper}>
        <button
          onClick={() => setActiveTab("saved")}
          className={clsx(css.tab, activeTab === "saved" && css.active)}
        >
          Збережені історії
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={clsx(css.tab, activeTab === "my" && css.active)}
        >
          Мої історії
        </button>
      </div>
    </div>
  );
};
