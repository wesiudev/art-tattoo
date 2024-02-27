import "../styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Anton } from "next/font/google";
import { Providers } from "@/redux/Provider";
import Script from "next/script";
import TopBar from "./(home)/components/ShopHero/TopBar";
import { Cardo } from "next/font/google";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${cocosharp.variable} ${cardo.variable} ${anton.variable} bg-[#1d1d1d]`}
      >
        <Providers>
          <TopBar />
          {children}
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SYTL7MG8Q4" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SYTL7MG8Q4');
          `}
        </Script>
      </body>
    </html>
  );
}

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});
const cardo = Cardo({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cardo",
});
const cocosharp = localFont({
  src: [
    {
      path: "../../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1d1d1d",
  publisher: "Black Bell Tattoo & Art",
  manifest: "/manifest.json",
  keywords: [
    "Najlepsi artyści tatuażu w Grudziądzu",
    "Projekt tatuażu Grudziądz",
    "Profesjonalne studio tatuażu Grudziądz",
    "Unikalne tatuaże Grudziądz",
    "Salon tatuażu Grudziądz",
    "Tatuaż na zamówienie Grudziądz",
    "Sztuka tatuażu Grudziądz",
    "Ceny tatuażu Grudziądz",
    "Porady dotyczące pielęgnacji tatuażu",
    "Umówienie się na tatuaż Grudziądz",
    "Bezpieczny tatuaż Grudziądz",
    "Tatuaż na nadgarstku Grudziądz",
    "Kolorowe tatuaże Grudziądz",
    "Tatuaż dla kobiet Grudziądz",
    "Tatuaż dla mężczyzn Grudziądz",
    "Tatuaż z cytatem Grudziądz",
    "Mały tatuaż Grudziądz",
    "Tatuaż na przedramieniu Grudziądz",
    "Tatuaż dla par Grudziądz",
    "Tatuaż religijny Grudziądz",
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
  title: "Blackbell - Studio Tatuażu Grudziądz | Umów się na sesję tatuażu",
  description:
    "Salon Tatuażu w Grudziądzu. Sprawdź wzory i zarezerwuj termin. Stworzę tatuaż według Twoich indywidualnych potrzeb.",
  openGraph: {
    type: "website",
    url: "https://blackbellart.com",
    title: "Blackbell - Studio Tatuażu Grudziądz | Umów się na sesję tatuażu",
    description:
      "Salon Tatuażu w Grudziądzu. Sprawdź wzory i zarezerwuj termin. Stworzę tatuaż według Twoich indywidualnych potrzeb.",
    siteName: "Black Bell Tattoo & Art",
  },
};
