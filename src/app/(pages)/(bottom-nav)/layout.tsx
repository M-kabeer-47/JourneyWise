import BottomNavbar from "@/components/layout/BottomNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNavbar />
    </>
  );
}
