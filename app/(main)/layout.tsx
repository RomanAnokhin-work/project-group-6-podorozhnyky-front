'use client';

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import EditProfilePage from "./edit/page";
import { usePathname } from "next/navigation";


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
        {pathname === "/edit" ? <EditProfilePage/> : (
          <>
          <Header />
        {children}
        <Footer />
      </>
      )}
        
      </AuthProvider>
    </TanStackProvider>
  );
}
