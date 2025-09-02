import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    console.log("Navbar layout re rendered");
        return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}