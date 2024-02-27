import { getTattoos } from "@/firebase";
import { Tattoo } from "@/types";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import didYouKnowArray from "./didyouknow.json";
import DidYouKnow from "./DidYouKnow";
export async function generateStaticParams() {
  const tattoos = await getTattoos();
  return tattoos?.tattoos.map((tattoo: Tattoo) => ({
    title: polishToEnglish(tattoo.title),
  }));
}
export default async function Page({ params }: { params: Tattoo }) {
  const tattoo: Tattoo = await getTattoos().then((res) =>
    res?.tattoos.find(
      (tattoo: Tattoo) => polishToEnglish(tattoo.title) === params.title
    )
  );
  const tattoos = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/tattoo`,
    { next: { revalidate: 180 } }
  ).then((res) => res.json());

  return (
    <div className="w-full min-h-screen bg-[#404040] mt-[60px] overflow-x-hidden flex flex-col">
      <div className="w-full">
        <div className="w-[100vw] border-b-2 border-[#606060]  bg-[#404040] z-50 flex flex-col lg:flex-row ">
          <div className="lg:w-[40vw]">
            <Image
              width={512}
              height={512}
              src={tattoo.projectSrc}
              alt={`Tatuaż Grudziądz Wzory ${tattoo.title}`}
              className="bg-[#303030] border-2 border-[#606060] w-full p-3 lg:p-6 lg:border-b-0"
            />
          </div>
          <div className="font-anton flex flex-col p-3 bg-[#404040] h-full w-screen lg:w-[60vw] relative">
            <div className="absolute left-1 top-2  z-[50]">
              <div className="w-6 h-6 group">
                <FaInfoCircle className="text-3xl text-gray-500" />
                <h2 className="bg-white text-black  rounded-md p-3 hidden group-hover:block w-[90vw] lg:w-[40vw] font-coco  text-base lg:text-xl  text-left  mt-6 lg:mt-3 drop-shadow-md shadow-black border-b border-[#505050] lg:pb-3">
                  Każdy z tych tatuaży jest dostępny{" "}
                  <span className="font-bold">tylko raz</span>. Po wybraniu
                  przez Ciebie konkretnego projektu, zostaje on{" "}
                  <span className="font-bold">
                    niezwłocznie usunięty z tej listy
                  </span>
                  , gwarantując, że będziesz jedyną osobą noszącą ten wyjątkowy
                  wzór. Miłego przeglądania i do zobaczenia w studiu!
                </h2>
              </div>
            </div>
            <div className="font-anton flex flex-col p-3 bg-[#404040] h-full w-screen lg:w-[60vw] lg:pr-6">
              <h1 className=" text-white text-left lg:text-3xl xl:text-5xl text-5xl xl:py-6 py-6 lg:py-2">
                {tattoo.title}{" "}
                {tattoo.workSrc !== "none" && (
                  <span className="text-red-500"> (Niedostępny)</span>
                )}
              </h1>
              {tattoo.description && (
                <h3 className="lg:text-lg xl:text-2xl text-2xl text-gray-300 font-coco font-medium">
                  {tattoo.description}
                </h3>
              )}
              {tattoo.meaning && (
                <h2 className="lg:text-lg xl:text-xl text-xl mt-8 lg:mt-3 xl:mt-8 pr-[15px]">
                  <span className="text-green-400">Znaczenie tatuażu: </span>
                  <span className="text-white">{tattoo.meaning}</span>
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid z-[50] grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 px-3 mt-3 relative">
        {tattoos?.tattoos.map((item: Tattoo, i: any) => (
          <Link
            href={`/studio-tatuazu-grudziadz-wzory/${polishToEnglish(
              item.title
            )}`}
            key={i}
            className="aspect-square h-full relative flex items-center justify-center"
          >
            <div
              className={`w-full h-full border-2 border-[#606060] hover:border-green-400 cursor-pointer flex items-center justify-center p-2 bg-[#303030] `}
            >
              <Image
                src={item.projectSrc}
                width={512}
                height={512}
                alt={`Tatuaż Grudziądz Wzory ${item.title}`}
                className={`aspect-square w-auto h-full object-fit delay-500 duration-1000 `}
              />
            </div>
            <div className="absolute top-2 left-2 w-max h-max  text-2xl text-[#707070] italic">
              {i + 1}.
            </div>

            <div
              className={`absolute  bottom-2 right-2 w-max h-max text-red-500`}
            >
              {item.workSrc !== "none" && "Niedostępny"}
            </div>
          </Link>
        ))}
      </div>
      <div className="mx-auto mt-12 flex flex-col  text-white w-full pb-6 font-anton">
        <DidYouKnow array={didYouKnowArray.didYouKnowArray} />
      </div>
      <div className="mx-auto mt-12 flex flex-col  text-white w-full pb-6 font-anton">
        <div className="justify-center items-center flex text-center flex-col">
          <div className="mb-3">
            <Link
              target="_blank"
              href="https://blackbellart.com"
              className="text-purple-300 text-4xl"
            >
              Blackbell Tattoo
            </Link>
          </div>
          <div className="text-xl text-gray-400">
            developer:{" "}
            <Link target="_blank" href="https://www.quixy.pl">
              <span className="text-yellow-400"> Quixy</span> - Strony
              Internetowe Grudziądz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  // fetch data
  const tattoo: Tattoo = await getTattoos().then((res) =>
    res?.tattoos.find(
      (tattoo: Tattoo) => polishToEnglish(tattoo.title) === params.title
    )
  );

  if (tattoo)
    return {
      title: "Blackbell - Studio Tatuażu Grudziądz - Tatuażystka Blackbell",
      description: `Zobacz tatuaż ${tattoo.title}. Sprawdź moje wzory tatuaży i wybierz ten, który najbardziej Ci się podoba.`,
      openGraph: {
        type: "website",
        url: `https://blackbellart.com/studio-tatuazu-grudziadz-wzory/${polishToEnglish(
          tattoo.title
        )}`,
        title: "Blackbell - Studio Tatuażu Grudziądz - Tatuażystka Blackbell",
        description: `Zobacz tatuaż ${tattoo.title}. Sprawdź moje wzory tatuaży i wybierz ten, który najbardziej Ci się podoba.`,
        siteName: "BlackbellArt",
        images: [
          {
            url: "/favicons/favicon.ico",
          },
        ],
      },
    };
}
