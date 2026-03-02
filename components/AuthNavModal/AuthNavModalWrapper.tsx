"use client";

import { useState } from "react";
import AuthNavModal from "@/components/AuthNavModal/AuthNavModal";

export default function AuthNavModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return <AuthNavModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
