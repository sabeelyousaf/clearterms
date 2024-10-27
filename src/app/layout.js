import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const font = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Clear Terms',
  description: 'clear terms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
