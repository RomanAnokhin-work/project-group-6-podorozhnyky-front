import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";



const inter = Inter({
  variable: "--font-inter",
  subsets: ['cyrillic'],
  weight: ["400", "700"],
})

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ['cyrillic'],
  weight: ['400', '600', '700']
})


export const metadata: Metadata = {
  title: "Podorozhnyky App",
  description: "Podorozhnyky app",
};

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
              <Header />
        <main >{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
