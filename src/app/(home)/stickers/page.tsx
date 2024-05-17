// import { categoriesArray } from "@/components/categories"; TODO FETCH
import { getProducts } from "@/firebase/zaklejki-logic";
import { Metadata } from "next";
import Image from "next/image";
import MasonryGrid from "../components/Masonry";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const products: any = await getProducts();
  // console.log(searchParams?.query);
  const categories = products?.products
    ?.map((product: any) => product.categories)
    .flat()
    .filter(
      (category: any, index: any, array: any) =>
        array.indexOf(category) === index
    );

  return (
    <>
      <div className="mt-36 lg:mt-24 flex flex-col-reverse lg:grid lg:grid-cols-2">
        <div className="px-6 mt-8 flex flex-col">
          <h2 className="mb-3 text-2xl font-bold text-white">Filtry</h2>
          <div className="flex flex-row flex-wrap mb-6">
            <Link
              href={`/stickers`}
              title={`Kategoria: Wszystkie`}
              className={`bg-black text-white text-sm hover:bg-opacity-80 border-2 px-3 border-transparent ${
                !searchParams?.query ? "border-white" : "hover:border-white"
              }`}
            >
              Wszystkie
            </Link>
            {categories.map((category: any, i: any) => (
              <Link
                href={`/stickers?query=${category}`}
                title={`Kategoria: ${category}`}
                key={i}
                className={`bg-black text-white text-sm hover:bg-opacity-80 border-2 px-3 border-transparent ${
                  searchParams?.query === category
                    ? "border-white"
                    : "hover:border-white"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
          <MasonryGrid
            products={products?.products}
            query={searchParams?.query}
          />
        </div>
        <div className="lg:pl-12 pb-12 lg:pb-48">
          <Image
            src="/images/stickers.png"
            width={1024}
            height={1024}
            alt="Naklejki blackbellart"
            className=""
          />
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  keywords: `naklejki, naklejki ręcznie wycinane, naklejki na każdą okazję, naklejki na ścianę, naklejki dla dzieci, naklejki, naklejki bajkowe, naklejki złote, naklejki holograficzne, naklejki srebrne, drukowanie naklejek, naklejki z anime, naklejki na ścianę do kuchni, naklejki na ścianę nowoczesne, naklejki na ścianę dinozaury, naklejki na ścianę kwiaty, nalepki na ścianę, wlepki, nalepki, wlepy, nakejki, nakleki, nalejki`,
  title: `Sklep z Naklejkami | Autorskie naklejki na zamówienie`,
  description: `Kup jedną z moich naklejek lub zamów obraz. Naklejki złote, srebrne, holo. Naklejki na ścianę. Kolekcja naklejek ozdobnych.`,
  openGraph: {
    type: "website",
    url: "https://blackbellart.com",
    title: `Sklep z Naklejkami | Autorskie naklejki na zamówienie`,
    description: `Kup jedną z moich naklejek lub zamów obraz. Naklejki złote, srebrne, holo. Naklejki na ścianę. Kolekcja naklejek ozdobnych.`,
    siteName: "blackbellart",
    images: [
      {
        url: "/favicons/android-chrome-192x192.png",
      },
    ],
  },
};
