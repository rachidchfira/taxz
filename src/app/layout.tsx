import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vietnam PIT Finalization Service | Expert Tax Help for Foreigners",
  description: "Premium Personal Income Tax finalization services for expatriates and foreigners in Vietnam. Expert guidance on tax residency, PIT refunds, and compliance - backed by official Vietnamese government sources.",
  keywords: ["Vietnam PIT", "tax finalization", "foreigner tax Vietnam", "expat tax Vietnam", "PIT refund", "tax residency Vietnam", "Vietnam personal income tax"],
  authors: [{ name: "Vietnam PIT Services" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Vietnam PIT Finalization Service for Foreigners",
    description: "Expert Personal Income Tax finalization services for expatriates in Vietnam. Official-source-backed guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnam PIT Finalization Service",
    description: "Expert tax finalization services for foreigners in Vietnam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
