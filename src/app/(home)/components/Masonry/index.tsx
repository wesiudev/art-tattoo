"use client";
import Image from "next/image";
import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";

import Masonry from "react-masonry-css";
export default function MasonryGrid({
  products,
  query,
}: {
  products: any;
  query: any;
}) {
  const breakpointColumnsObj = {
    default: 4,
    1366: 4,
    1100: 3,
    700: 2,
    500: 2,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!query &&
        products?.map((item: any, i: any) => (
          <div
            key={i}
            className={`flex flex-col bg-black text-white h-max hover:scale-105 duration-100 group`}
          >
            <>
              <Link
                title={`Produkt ${item.title}`}
                href={`/stickers/${polishToEnglish(item.title)}`}
              >
                <Image
                  src={item.image_source}
                  width={1024}
                  height={1024}
                  alt={item.title}
                  className=""
                  title={item.title}
                />
              </Link>
              <Link
                title={`Produkt ${item.title}`}
                href={`/stickers/${polishToEnglish(item.title)}`}
              >
                <h2 className="p-3">{item.title}</h2>
              </Link>
              <p
                className={`-ml-3 -mt-3 pb-3 text-green-400 font-light flex flex-row text-sm flex-wrap px-3 space-y-3`}
              >
                {item.categories.map((category: string, j: any) => (
                  <Link
                    title={`Kategoria: ${category}`}
                    href={`/stickers?query=${polishToEnglish(category)}`}
                    key={j}
                    className={`${
                      j === 0 && "mt-3"
                    } ml-3 px-2 border-2 border-transparent group-hover:border-white bg-white bg-opacity-10 hover:bg-opacity-25`}
                  >
                    {category}
                  </Link>
                ))}
              </p>
            </>
          </div>
        ))}
      {query !== "" &&
        products
          ?.filter((item: any) => item.categories.includes(query))
          .map((item: any, i: any) => (
            <div
              key={i}
              className={`flex flex-col bg-black text-white h-max hover:scale-105 duration-100 group`}
            >
              <>
                <Link
                  title={`Produkt ${item.title}`}
                  href={`/stickers/${item.title}`}
                >
                  <Image
                    src={item.image_source}
                    width={1024}
                    height={1024}
                    alt={item.title}
                    className=""
                    title={item.title}
                  />
                </Link>
                <Link
                  title={`Produkt ${item.title}`}
                  href={`/stickers/${polishToEnglish(item.title)}`}
                >
                  <h2 className="p-3">{item.title}</h2>
                </Link>
                <p
                  className={`-ml-3 -mt-3 pb-3 text-green-400 font-light flex flex-row text-sm flex-wrap px-3 space-y-3`}
                >
                  {item.categories.map((category: string, j: any) => (
                    <Link
                      title={`Produkt ${item.title}`}
                      href={`/stickers?query=${polishToEnglish(category)}`}
                      key={j}
                      className={`${
                        j === 0 && "mt-3"
                      } ml-3 px-2 border-2 border-transparent group-hover:border-white bg-white bg-opacity-10 hover:bg-opacity-25`}
                    >
                      {category}
                    </Link>
                  ))}
                </p>
              </>
            </div>
          ))}
    </Masonry>
  );
}
