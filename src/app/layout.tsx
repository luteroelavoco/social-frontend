'use client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/styles/theme'
import { SnackbarProvider } from 'notistack'
import { UserProvider } from '@/context/User'
import { BookTradeProvider } from '@/context/BookTrade'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <BookTradeProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <body className={inter.className}>
                <Header />
                {children}
              </body>
            </SnackbarProvider>
          </ThemeProvider>
        </BookTradeProvider>
      </UserProvider>
    </html>
  )
}
