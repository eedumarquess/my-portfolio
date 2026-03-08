import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { LocaleDocumentController } from "@/components/LocaleDocumentController";
import { siteCopy } from "@/lib/site-content";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: siteCopy.pt.metadata.title,
  description: siteCopy.pt.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${lora.variable} antialiased`}>
        <LocaleDocumentController />
        <Header />
        {children}
      </body>
    </html>
  );
}
