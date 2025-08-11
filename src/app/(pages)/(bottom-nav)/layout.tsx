import BottomNavbar from "@/components/layout/BottomNavbar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNavbar />
    </>
  );
}
