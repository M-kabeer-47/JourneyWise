import "./globals.css";
import {  Raleway,Inter, Geist } from "next/font/google";
import Providers from "../providers/Providers";


const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway",weight: ['100','200','300','400','500','600','700','800','900'] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist",weight: ['100','200','300','400','500','600','700','800','900'] });

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
      <body className={`${raleway.variable} ${geist.variable}`}>
        <Providers>
          {children} 
        </Providers>
      </body>
    </html>
  );
}
