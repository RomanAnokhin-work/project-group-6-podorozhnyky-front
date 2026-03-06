import StoriesPageClient from "./StoriesPage.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon-1.svg"
  },
  title: "Історії | Podorozhnyky",
  description: "Читайте найцікавіші історії мандрівників зі всього світу.",
  openGraph: {
    title: "Історії подорожей | Podorozhnyky",
    description: "Надихайтесь подорожами інших та діліться своїми пригодами.",
    url: "https://project-group-6-podorozhnyky-front.vercel.app/stories",
    siteName: "Podorozhnyky",
    images: [
      { url: "/images/cover/cover.jpg", width: 1200, height: 630, alt: "Stories" },
    ],
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Історії подорожей | Podorozhnyky",
    description: "Читайте та діліться історіями подорожей.",
    images: ["/images/cover/cover.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://project-group-6-podorozhnyky-front.vercel.app/stories" },
};

export default function StoriesPage() {
  return (
    <main>
        <StoriesPageClient />
    </main>
  );
}
