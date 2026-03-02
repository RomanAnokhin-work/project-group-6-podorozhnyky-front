import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanStackProvider>
      <AuthProvider>
        <Header />
        {children}
        <Footer />
      </AuthProvider>
    </TanStackProvider>
  );
}
