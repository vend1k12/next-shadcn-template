import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Montserrat } from 'next/font/google'

import { APP_NAME } from '@/constants/seo'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const font = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  icons: '/favicon.ico'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={cn(
          'flex flex-col justify-between min-h-screen bg-background font-sans antialiased',
          font.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
        >
          <main className='flex flex-col'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
