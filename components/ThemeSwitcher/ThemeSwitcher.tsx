"use client";

import { useThemeContext } from "@/hooks/useThemeContext";
import css from "./ThemeSwitcher.module.css";
import toast from "react-hot-toast";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    toast.success(`Тема змінена на ${isDark ? "світлу☀️" : "темну🌑"}!`);
  };

  return (
    <button
      type="button"
      className={css.switch}
      onClick={handleToggle}
      aria-label={
        isDark ? "Переключити на світлу тему" : "Переключити на темну тему"
      }
      aria-pressed={isDark}
    >
      <span className={css.track}>
        <span className={`${css.thumb} ${isDark ? css.thumbDark : ""}`} />
      </span>
      <span className={css.label}>{isDark ? "Темна" : "Світла"}</span>
    </button>
  );
};

export default ThemeSwitcher;
