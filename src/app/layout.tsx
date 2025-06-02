import "./globals.css";
import { Open_Sans, Raleway } from "next/font/google";
import Providers from "../providers/Providers";

const openSans = Open_Sans({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata = {
  title: "Premium Travel App",
  description: "Explore the world with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} ${raleway.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
