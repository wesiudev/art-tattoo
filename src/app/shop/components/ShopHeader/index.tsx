import Image from "next/image";
import Link from "next/link";
import ScrollTo from "../ScrollTo";

export default function ShopHeader() {
  return (
    <div className="h-screen relative font-coco grid grid-cols-1 lg:grid-cols-2 lg:pb-0 overflow-y-hidden pt-[66px] px-5 lg:px-[8vw] xl:px-[12vw]">
      <div className="relative flex flex-col justify-center  w-full max-w-xl md:px-0 lg:max-w-screen-xl">
        <div className="mb-16 pt-24 lg:py-40 lg:max-w-lg relative">
          <span className="font-sans font-bold py-3 absolute top-6 left-0 ">
            /{" "}
            <Link href="/" className="hover:underline hover:underline-offset-2">
              blackbellart
            </Link>{" "}
            /{" "}
            <Link
              href={`/sklep`}
              className="hover:underline hover:underline-offset-2"
            >
              {" "}
              sklep
            </Link>
          </span>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-purple-400">
            Sztuka
          </p>
          <h1 className="text-left mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Obrazy na płótnie, które <br className="block" />
            swoją{" "}
            <span className="text-purple-400 font-bold drop-shadow-lg shadow-black ">
              obecnością
            </span>
            <span className="inline-block text-deep-purple-accent-400">
              wypełniają przestrzeń energią.
            </span>
          </h1>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Sztuka jest dla mnie sposobem na życie. To, co tworzę, jest wyrazem
            mojej osobowości. Tworzę obrazy inspirowane światem przyrody,
            okultyzmu i wnętrza duchowego.
          </p>
          <div className="flex items-center">
            <Link
              title="Zamów obraz"
              href="/wycena-obrazu"
              className="cursor-pointer inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
            >
              Wycena obrazów
            </Link>
            <Link
              href="https://www.facebook.com/blackbell.c.e"
              title="Przejdź do Facebooka"
              target="_blank"
              aria-label=""
              className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Więcej o mnie
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full my-auto items-center justify-center lg:justify-end relative">
        <Image
          src="/images/image/common/blackbell.webp"
          className="w-[95%] lg:h-auto h-auto lg:rounded-xl"
          alt="Sztuka Blackbell.c.e Eliza Czerwińska"
          width={1200}
          height={1500}
        />
      </div>
    </div>
  );
}
