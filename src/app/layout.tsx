import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abu Haani | Luxury Artisanal Attars & Pure Fragrances",
  description: "Hand-crafted pure non-alcoholic artisanal attars and pure perfumes. Discover timeless fragrances.",
  openGraph: {
    title: "Abu Haani | Discover Timeless Fragrances",
    description: "Pure artisanal non-alcoholic attars with 16+ hours longevity.",
    url: "https://ezf1x7-pn.myshopify.com",
    siteName: "Abu Haani Parfumerie",
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/0852/1826/3299/files/2nd_de1f8517-6064-458b-898e-55c7a3326a9f.jpg?v=1794477876",
        width: 1200,
        height: 630,
        alt: "Abu Haani Luxury Perfume",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Luxury Typography Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind Styling Engine */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      serif: ['"Playfair Display"', 'Georgia', 'serif'],
                      cinzel: ['"Cinzel"', 'serif'],
                      sans: ['"Poppins"', '"Plus Jakarta Sans"', 'sans-serif'],
                      poppins: ['"Poppins"', 'sans-serif'],
                    },
                      sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
                    },
                    colors: {
                      cream: {
                        50: '#FDFBF7',
                        100: '#F8F4EC',
                        200: '#F0E7D6',
                        300: '#E6D7BD',
                      },
                      sepia: {
                        900: '#231609',
                        800: '#2C1D0E',
                        700: '#422E1B',
                        600: '#5C442D',
                        500: '#7A6045',
                        400: '#9E8367',
                      },
                      gold: {
                        100: '#FBF3DD',
                        200: '#F5E2B3',
                        300: '#EDCE82',
                        400: '#E4B853',
                        500: '#D4A037',
                        600: '#B88325',
                        700: '#946518',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F4EC] text-[#2C1D0E] font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
