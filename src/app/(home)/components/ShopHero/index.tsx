import Image from "next/image";
import Link from "next/link";
import ScrollTo from "../ScrollTo";

export default function ShopHero() {
  return (
    <div className="h-max relative font-coco grid grid-cols-1 lg:grid-cols-2 lg:pb-0 overflow-y-hidden pt-[88px] px-5 lg:px-[8vw] xl:px-[12vw]">
      <div className="relative flex flex-col justify-center  w-full max-w-xl md:px-0 lg:max-w-screen-xl">
        <div className="mb-16 pt-24 lg:py-24 lg:max-w-lg relative">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-purple-400">
            Sztuka
          </p>
          <h1 className="font-cardo text-left mb-5 text-3xl tracking-tight font-bold text-zinc-800 sm:text-4xl sm:leading-none">
            Sklep z obrazami na płótnie i nie tylko, zamów obraz dla siebie lub
            na prezent!
          </h1>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Sztuka jest dla mnie sposobem na życie. To, co tworzę, jest wyrazem
            mojej osobowości. Tworzę obrazy inspirowane światem przyrody i
            wnętrza duchowego.
          </p>
          <div className="flex items-center">
            <Link
              title="Zamów obraz"
              href="/wycena-obrazu"
              className="cursor-pointer inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-600 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
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
          className="lg:w-[95%] h-auto rounded-xl"
          alt="Sztuka Blackbell.c.e Eliza Czerwińska"
          width={1200}
          height={1500}
        />
      </div>
    </div>
  );
}
