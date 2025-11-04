import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-light-gray">
        {/* pt-[70px] matches the navbar height to prevent content from hiding behind it */}
        {children}
      </main>
      <Footer />
    </>
  );
}
