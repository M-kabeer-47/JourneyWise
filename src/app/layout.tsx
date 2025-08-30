import "./globals.css";
import {  Raleway } from "next/font/google";
import Providers from "../providers/Providers";
import FetchUserFromClient from "@/providers/FetchUserFromClient";

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
      <body className={`${raleway.variable}`}>
        <Providers>
          <FetchUserFromClient children={children} />
        </Providers>
      </body>
    </html>
  );
}
