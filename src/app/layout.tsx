import './globals.css'
import { Open_Sans, Raleway } from 'next/font/google'
import StoreProvider from '../providers/redux'
import Footer from '../components/home/Footer'
import Navbar from '../components/home/Navbar'
const openSans = Open_Sans({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })

export const metadata = {
  title: 'Premium Travel App',
  description: 'Explore the world with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <StoreProvider>   
      
      <body className={`${openSans.className} ${raleway.variable}`}>
      {/* <Navbar />   */}
        {children}
        {/* <Footer /> */}
      </body>
      </StoreProvider>  
      
    </html>
  )
}

