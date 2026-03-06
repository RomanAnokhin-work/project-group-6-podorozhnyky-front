import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
// import css from "./(main)/Home.module.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon-1.svg",
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
    description: "Читайте історії подорожей та діліться власними пригодами.",
    images: ["/images/cover/cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["cyrillic"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            {/* <Header />
        <main className={css.container} >{children}</main>
            <Footer /> */}

            {children}
            <Toaster   position="top-right"reverseOrder={false}/>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
