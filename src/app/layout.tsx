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
      <head>
        {/* Luxury Typography Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* High-Performance Tailwind Styling Engine */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    fontFamily: {
                      serif: ['"Playfair Display"', 'Georgia', 'serif'],
                      cinzel: ['"Cinzel"', 'serif'],
                      sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
                    },
                    colors: {
                      gold: {
                        100: '#FDF7E7',
                        200: '#F7E7BE',
                        300: '#F5DEB3',
                        400: '#E5C158',
                        500: '#D4AF37',
                        600: '#B89222',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#090807] text-[#f5deb3] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
