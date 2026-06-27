import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://utilia.up.railway.app",
  ),
  title: "Utilia — Ferramentas online rápidas e grátis",
  description:
    "Use ferramentas online simples para criar QR Code de WhatsApp, converter áudio e calcular margem de venda.",
  applicationName: "Utilia",
  openGraph: {
    title: "Utilia — Ferramentas online rápidas e grátis",
    description:
      "Ferramentas rápidas, simples e úteis para tarefas do dia a dia.",
    siteName: "Utilia",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {process.env.NEXT_PUBLIC_ENABLE_ADS === "true" && adsenseClient ? (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
