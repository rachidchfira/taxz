import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  baseStructuredData,
  jsonLd,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: "TaxFinalization | Vietnam PIT Finalization for Foreigners",
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "tax services",
  verification: {
    google: "HPyWJbPWQxoHuFqqqQBmpBEnTDq15qR41ipMmVcgPPE",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "TaxFinalization | Vietnam PIT Finalization for Foreigners",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/og-image.svg"),
        width: 1200,
        height: 630,
        alt: "TaxFinalization Vietnam PIT finalization services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxFinalization | Vietnam PIT Finalization for Foreigners",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/og-image.svg")],
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(baseStructuredData())}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
