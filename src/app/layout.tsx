'use client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/styles/theme'
import { SnackbarProvider } from 'notistack'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Frontend',
  description: 'Frontend para teste de admissão'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <body className={inter.className}>{children}</body>
        </SnackbarProvider>
      </ThemeProvider>
    </html>
  )
}
