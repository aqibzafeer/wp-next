import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";
import { ToasterProvider } from "@/lib/toasterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.azlangarments.com'),
  title: 'Azlan Garments - Premium Fashion & Clothing Store | Shop Online',
  description: 'Discover premium quality fashion and clothing at Azlan Garments. Shop trendy collections, traditional wear, and exclusive designs. Free shipping on orders over Rs 500. 30-day returns.',
  icons: {
    icon: '/logo.svg',
  },
  keywords: 'fashion, clothing, online store, garments, traditional wear, casual wear, formal suits, premium quality, India',
  authors: [{ name: 'Azlan Garments' }],
  creator: 'Azlan Garments',
  publisher: 'Azlan Garments',
    formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: 'Azlan Garments - Premium Fashion & Clothing Store',
    description: 'Shop our exclusive collection of premium fashion and clothing online. Free shipping, secure payment, 30-day returns.',
    url: 'https://www.azlangarments.com',
    siteName: 'Azlan Garments',
    images: [
      {
        url: '/banner-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Azlan Garments - Premium Fashion Store',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Azlan Garments',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
      >
        <CartProvider>
          <ToasterProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ToasterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
