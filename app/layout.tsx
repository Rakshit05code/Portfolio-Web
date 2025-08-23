import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import dynamic from 'next/dynamic'

// Dynamically import Analytics with SSR disabled
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rakshit.Codes - Web Developer",
  description:
    "Modern portfolio showcasing full-stack development skills, projects, and certifications. Built with Next.js, React, and cutting-edge web technologies.",
  keywords: "full stack developer, web development, React, Next.js, portfolio, JavaScript, TypeScript",
  authors: [{ name: "Rakshit" }],
  creator: "Rakshit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakshit.codes",
    title: "Rakshit.Codes - Full Stack Developer",
    description: "Modern portfolio showcasing full-stack development skills and projects",
    siteName: "Rakshit.Codes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakshit.Codes - Full Stack Developer",
    description: "Modern portfolio showcasing full-stack development skills and projects",
    creator: "@rakshit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        
        <link rel="icon" type="image/png" sizes="32x32" href="R.png"/>
        
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
