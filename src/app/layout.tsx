import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      "https://siteprafarmarcash-production.up.railway.app",
  ),
  title: "Utilia - Ferramentas rapidas online",
  description:
    "Use ferramentas online gratis para criar QR Code de WhatsApp, gerar QR Code de links, converter arquivos simples e calcular margem de venda.",
  applicationName: "Utilia",
  openGraph: {
    title: "Utilia - Ferramentas rapidas online",
    description:
      "Ferramentas rapidas, simples e uteis para tarefas do dia a dia.",
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
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
