import { Metadata } from "next";
import TopBar from "../(home)/components/ShopHero/TopBar";
import Orders from "../(home)/components/Orders";
import ShopFooter from "../(home)/components/ShopFooter";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-[#ffffff]`}>
      <TopBar />
      {children}
      <Orders />
      <ShopFooter />
    </div>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "white",
  publisher: "BlackBell Tattoo & Art",
  manifest: "/manifest.json",
  keywords: [
    "tattoo",
    "tattoo artist",
    "tattoo studio",
    "tattoo shop",
    "tattoo shop near me",
    "tattoo shop in Grudziądz",
    "tattoo shop in Poland",
    "art shop",
    "art shop near me",
    "art shop in Grudziądz",
    "art shop in Poland",
    "art",
    "art near me",
    "art in Grudziądz",
    "art in Poland",
    "best tattoo artist",
    "best tattoo studio",
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
  title:
    "BlackbellArt.com - Regulamin strony internetowej i sklepu internetowego Black Bell Tattoo & Art",
  description:
    "Regulamin strony internetowej i sklepu internetowego Black Bell Tattoo & Art",
  openGraph: {
    type: "website",
    url: "https://blackbellart.com",
    title:
      "Studio Tatuażu Grudziądz - Unikalne wzory | Personalizowanie Projektów",
    description:
      "Salon Tatuażu w Grudziądzu. Sprawdź wzory i zarezerwuj termin. Stworzę tatuaż według Twoich indywidualnych potrzeb.",
    siteName: "Black Bell Tattoo & Art",
  },
};
