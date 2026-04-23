import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./components/Toast";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inicio reforma laboral",
  description: "Inicio reforma laboral",
  keywords: [
    "Reforma Laboral",
    "Multas Millonarias",
    "Clausuras Temporales",
    "Riesgos Laborales",
    "Derecho Laboral",
  ],
  other: {
    "google-site-verification": "Sjvr4v7EGRfdGd1hqq8XTBMdqvhfUlmZSvvsfo5lKmo",
  },
  openGraph: {
    title: "Inicio reforma laboral",
    description: "Inicio reforma laboral",
    url: "",
    siteName: "Inicio reforma laboral",
    images: [
      {
        url: "/logo_pravice.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider>
          <CartProvider>
            {children}
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
