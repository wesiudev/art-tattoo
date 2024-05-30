/* eslint-disable @next/next/no-img-element */

import { getShopProduct } from "@/lib/getShopProduct";
import { ArtworkData } from "@/types";
import { Layout } from "../../components/Canvas3D/components/dom/Layout";
import Canvas3D from "../../components/Canvas3D/components/Canvas3D";
import ShopFooter from "../../components/ShopFooter";
import Orders from "../../components/Orders";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { getPolishCurrency } from "../../../../../utils/getPolishCurrency";
import ProductImages from "./ProductImages";
export async function generateStaticParams() {
  const products = await getShopProduct();
  return products?.map((product: ArtworkData) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export default async function Page({ params }: { params: ArtworkData }) {
  const product: ArtworkData = await getShopProduct(
    params.category,
    params.slug
  );
  const products = await getShopProduct();
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/orders?secret=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 30 } }
  ).then((res) => res.json());

  return (
    <>
      <div className="relative font-coco grid grid-cols-1 lg:pb-0 mt-[91px] lg:mt-[66px] min-h-screen bg-white pt-12 px-5 lg:px-[8vw] xl:px-[12vw]">
        <div className="bg-white w-full relative z-[55] select-none min-h-screen">
          <div className="">
            <h1 className="text-zinc-800 drop-shadow-lg shadow-black text-xl sm:text-3xl xl:text-4xl text-center lg:text-left font-bold flex flex-row items-center">
              {product.title}
              <span className="text-zinc-800 bg-purple-300 p-2 rounded-xl drop-shadow-lg shadow-black text-xl ml-3 !font-bold">
                {getPolishCurrency(product.price)}
              </span>
            </h1>
            <span className="text-zinc-600 drop-shadow-lg shadow-black text-lg font-bold">
              {product.dimensions}
            </span>
            <p className="text-zinc-700 text-lg sm:text-base xl:text-lg text-left my-3">
              {product.description}
            </p>
            <ProductImages product={product} />
            <span className="text-zinc-600 drop-shadow-lg shadow-black text-lg">
              Artysta: <strong>{product.artist}</strong>
            </span>
            <br />
            <span className="text-zinc-600 drop-shadow-lg shadow-black text-lg">
              Technika: <strong>{product.medium}</strong>
            </span>
            <br />
            {product.category === "artwork" && (
              <>
                <span className="text-zinc-600 drop-shadow-lg shadow-black text-lg">
                  Rok produkcji: <strong>{product.year}</strong>
                </span>
                <br />
              </>
            )}
            <span className="text-zinc-600 drop-shadow-lg shadow-black text-lg">
              Oryginał:{" "}
              <strong>{product.category === "print" ? "Nie" : "Tak"}</strong>
            </span>
            <br />
            {product.category === "artwork" && product.isPrint && (
              <span className="text-zinc-500 drop-shadow-lg shadow-black text-lg">
                <Link
                  href={`/print/${product.slug}`}
                  className="flex flex-row items-center"
                >
                  <FaCheck className="mr-2 text-green-600" /> Druk dostępny -{" "}
                  <span className="underline underline-offset-2 ml-1">
                    {" "}
                    zamów tutaj
                  </span>
                </Link>
              </span>
            )}
            <div className="flex justify-center lg:justify-start mt-5">
              <AddToCartBtn product={product} orders={orders.data} />
            </div>
            <div className="flex flex-col bg-gray-200 p-3 mt-5">
              {product.sections.map((section: any, i: any) => (
                <div key={i}>
                  <h3 className="text-zinc-800 drop-shadow-lg shadow-black text-xl sm:text-2xl xl:text-3xl text-center lg:text-left font-bold flex flex-row items-center">
                    {section.title}
                  </h3>
                  <p className="text-zinc-700 text-lg sm:text-base xl:text-lg text-left my-3">
                    {section.content}
                  </p>
                </div>
              ))}
              {/* <Link href="/blog/art" className="text-blue-500">
              Więcej na moim blogu
            </Link> */}
            </div>
            <div className="p-3 py-6">
              <h3 className="mt-8 text-zinc-800 drop-shadow-lg shadow-black text-lg sm:text-xl xl:text-2xl text-center lg:text-left font-bold flex flex-row items-center">
                Więcej moich prac:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-3 gap-y-5 my-5">
                {products?.map((item: any, i: any) => (
                  <>
                    {item.title !== product.title &&
                      !["print", "sticker", "inspiration"].includes(
                        item.category
                      ) &&
                      i <= 6 && (
                        <Link
                          key={i}
                          href={`/${item.category}/${item.slug}`}
                          className="text-blue-400 flex flex-col relative overflow-y-hidden group drop-shadow-sm shadow-black"
                        >
                          <Image
                            src={item.images[0]}
                            width={1024}
                            height={1024}
                            alt={`Obraz na płótnie ${item.title}`}
                            className=" w-full h-full object-cover drop-shadow-lg shadow-black"
                          />
                          <div
                            className={`absolute bottom-0 left-0 bg-[#444444] p-2 flex flex-col items-start justify-start w-full translate-y-[100%] duration-500 group-hover:translate-y-[0%] transition-all`}
                          >
                            <span>{item.title}</span>
                            <span className="text-sm text-gray-300">
                              {item?.description?.slice(0, 48)}
                              {item?.description?.length > 48 ? "..." : ""}
                            </span>
                          </div>
                        </Link>
                      )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Orders />
      <ShopFooter isProductSlug={true} />
    </>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  // fetch data
  const product = await getShopProduct(params.category, params.slug);
  function returnMetadata(property: string, category: string) {
    switch (property) {
      case "title":
        if (category === "artwork") {
          return "Obrazy na płótnie";
        }
        if (category === "sticker") {
          return "Naklejka na ściane";
        }
        if (category === "print") {
          return "Obraz na zamówienie";
        }
        if (category === "inspiration") {
          return "Malowanie obrazów na zamówienie";
        }
        break;
      case "description":
        if (category === "artwork") {
          return "Kup oryginalne obrazy na płótnie: obrazy olejne, portrety i abstrakcje. Kup unikalny obraz już dziś.";
        }
        if (category === "sticker") {
          return "Kup naklejki na ścianę od prawdziwego artysty – wyraz twórczej pasji. Te naklejki to starannie zaprojektowane dzieła.";
        }
        if (category === "print") {
          return "Kup unikalne obrazy na zamówienie od artystki. Oryginalne obrazy olejne, portrety i abstrakcje";
        }
        if (category === "inspiration") {
          return "Kup malowany obraz na płótnie na zamówienie. Indywidualne projekty, które oddają Twoją wyjątkową wizję. Zamów swoje dzieło już dziś!";
        }
        break;
      default:
        break;
    }
  }
  if (product)
    return {
      keywords: product.keywords,
      title: `Sklep z Obrazami | ${returnMetadata(
        "title",
        product.category
      )} | ${product.title}`,
      description: returnMetadata("description", product.category),
      openGraph: {
        keywords: product.keywords,
        type: "website",
        url: "https://blackbellart.com",
        title: `BlackbellArt.com | ${returnMetadata(
          "title",
          product.category
        )}`,
        description: returnMetadata("description", product.category),
        siteName: "BlackbellArt",
        images: [
          {
            url: "/favicons/favicon.ico",
          },
        ],
      },
    };
}
