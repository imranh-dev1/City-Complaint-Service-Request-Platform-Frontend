import Footer from "@/components/layout-public/footer";
import Navbar from "@/components/layout-public/navbar";
import { cn } from "cn";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
