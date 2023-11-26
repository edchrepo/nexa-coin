import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MarketData from '@/components/MarketData'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crypto App',
  description: 'Analyzing Crypto Trends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <MarketData />
        {children}
      </body>
    </html>
  )
}
