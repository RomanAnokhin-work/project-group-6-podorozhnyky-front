'use client';

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import EditProfilePage from "./edit/page";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/contexts/themeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: {
    icon: "/favicon-1.svg"
  },
  title: "Podorozhnyky – Подорожі та історії мандрівників",
  description:
    "Podorozhnyky – платформа для публікації історій мандрівників. Діліться своїми подорожами, відкривайте нові місця та надихайте інших.",

  keywords: [
    "подорожі",
    "travel stories",
    "блог про подорожі",
    "мандрівки",
    "туризм",
  ],

  openGraph: {
    title: "Podorozhnyky – Подорожі та історії мандрівників",
    description:
      "Читайте історії подорожей, діліться власними пригодами та відкривайте світ разом із Podorozhnyky.",
    url: "https://project-group-6-podorozhnyky-front.vercel.app",
    siteName: "Podorozhnyky",
    images: [
      {
        url: "/images/cover/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Podorozhnyky travel stories",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Podorozhnyky – Подорожі та історії мандрівників",
    description:
      "Читайте історії подорожей та діліться власними пригодами.",
    images: ["/images/cover/cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <TanStackProvider>
      <AuthProvider>
        <ThemeProvider>
        {pathname === "/edit" ? <EditProfilePage/> : (
          <div className="mainLayout">
            <Header />
            <div className="mainContent">
              {children}
            </div>
            <Footer />
          </div>
      )}
        </ThemeProvider>
      </AuthProvider>
    </TanStackProvider>
  );
}
