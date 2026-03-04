"use client";

import { use } from "react";
import { ThemeContext } from "@/contexts/themeContext";

export const useThemeContext = () => {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }

  return context;
};

