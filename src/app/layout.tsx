"use client"
import './globals.css'
import { Open_Sans, Raleway } from 'next/font/google'
import StoreProvider from '../providers/redux'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const openSans = Open_Sans({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })

// export const metadata = {
//   title: 'Premium Travel App',
//   description: 'Explore the world with ease',
// }
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
        <QueryClientProvider client={queryClient} >
        
      <StoreProvider>
      
        
      
      <body className={`${openSans.className} ${raleway.variable}`}>
      <ReactQueryDevtools initialIsOpen={false} />   
      
        {children}
        
      </body>
      
      </StoreProvider>  
      </QueryClientProvider>
      
      
    </html>
  )
}

