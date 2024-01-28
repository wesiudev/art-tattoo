import TopBar from "./components/ShopHeader/TopBar";
import { Metadata } from "next";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      {" "}
      <TopBar />
      {children}
    </div>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1d1d1d",
  publisher: "Black Bell Tattoo & Art",
  manifest: "/manifest.json",
  keywords: [
    "BlackbellArt",
    "Sklep ze sztuką",
    "Obrazy na płótnie",
    "Sztuka na zamówienie",
    "Naklejki",
    "Oryginalne obrazy",
    "Naklejki na ścianę",
    "Inspiracja artystyczna",
    "Tworzenie własnych projektów",
    "Sztuka personalizowana",
    "Kup obrazy online",
    "Oryginalne dzieła sztuki",
    "Sztuka współczesna",
    "Galeria sztuki BlackbellArt",
    "Artystyczne inspiracje",
    "Dekoracje ścienne",
    "Sztuka do mieszkania",
    "Projektowanie przestrzeni",
    "Galeria obrazów online",
    "Kreatywne aranżacje mieszkania",
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
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
  title: "BlackbellArt - Sklep | Obrazy Na Płótnie | Sztuka Na Zamówienie",
  description:
    "Sklep ze sztuką BlackbellArt. Kup oryginalne obrazy na płótnie, naklejki na ścianę i obrazy na zamówienie. Znajdź inspirację i stwórz własny projekt.",
  openGraph: {
    type: "website",
    url: "https://blackbellart.com",
    title: "BlackbellArt - Sklep | Obrazy Na Płótnie | Sztuka Na Zamówienie",
    description:
      "Sklep ze sztuką BlackbellArt. Kup oryginalne obrazy na płótnie, naklejki na ścianę i obrazy na zamówienie. Znajdź inspirację i stwórz własny projekt.",
    siteName: "Black Bell Tattoo & Art",
  },
};
