import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Attar | Royal Haute Parfumerie & Pure Concentrated Oils",
  description: "100% Alcohol-Free Pure Cambodian Agarwood, Kannauj Rose, and White Musk Attars. Hand-distilled using ancient royal heritage techniques.",
  openGraph: {
    title: "Al-Attar | Royal Haute Parfumerie",
    description: "Hand-distilled 100% pure concentrated non-alcoholic attars. 16+ hours guaranteed longevity with free insured courier across India.",
    url: "https://www.royalattar.com",
    siteName: "Al-Attar Parfumerie",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Royal Attar Luxury Bottle",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090807] text-[#f5deb3] antialiased">
        {children}
      </body>
    </html>
  );
}
