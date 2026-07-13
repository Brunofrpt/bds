import type { Metadata } from "next";
import { Inter_Tight, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/main.scss";
import { seoConfig } from "@/config/seo.config";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  authors: [{ name: seoConfig.author }],
  metadataBase: new URL(seoConfig.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={seoConfig.language}
      className={`${interTight.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
