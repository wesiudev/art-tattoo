"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArtstation, FaHome, FaInfoCircle } from "react-icons/fa";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { useState } from "react";
import { Tattoo } from "@/types";
import DidYouKnow from "./[title]/DidYouKnow";
export default function TattooContent({
  tattoos,
  array,
}: {
  tattoos: Tattoo[];
  array: string[];
}) {
  const [hovered, setHovered] = useState<Tattoo>();
  const [selectedByUser, setSelectedByUser] = useState<Tattoo>();
  const [isMenuShow, setMenuShow] = useState(false);
  function handleItemHover(item: Tattoo, i: number) {
    if (!selectedByUser) {
      setHovered(item);
    }
  }

  function handleItemUnhover() {
    setHovered(undefined);
  }
  return (
    <div className="w-screen bg-[#303030] relative">
      {/* left side fixed */}

      <div
        className={`lg:overflow-y-scroll lg:overflow-x-hidden borderBar lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[40vw] border-[#505050] lg:block flex flex-row items-center justify-between px-3 lg:px-0`}
      >
        <button
          className={`lg:hidden relative !z-[2000] menu ${
            isMenuShow ? "opened" : ""
          }`}
          onClick={() => setMenuShow(!isMenuShow)}
          aria-expanded={isMenuShow}
          aria-label="Main Menu"
        >
          <svg width="65" height="65" viewBox="0 0 100 100">
            <path
              className="lineWhite line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="lineWhite line2" d="M 20,50 H 80" />
            <path
              className="lineWhite line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
        <div className="hidden lg:block w-full h-full mt-12">
          {hovered && (
            <div className="w-[100vw] lg:w-[40vw] lg:h-full h-max bg-[#303030] lg:pr-[15px]">
              <div className="font-anton flex flex-col bg-[#404040] min-h-screen w-screen lg:w-[40vw]">
                <div className="p-3">
                  <h1 className=" text-white text-left text-5xl py-6 lg:pr-6">
                    {hovered.title}{" "}
                    {hovered.workSrc !== "none" && (
                      <span className="text-red-500"> (Niedostępny)</span>
                    )}
                  </h1>
                  {hovered.description && (
                    <h3 className="text-2xl text-gray-300 font-coco font-medium lg:pr-6">
                      {hovered.description}
                    </h3>
                  )}

                  {hovered.meaning && (
                    <h2 className="text-xl mt-8 pr-[15px]">
                      <span className="text-green-400">
                        Znaczenie tatuażu:{" "}
                      </span>
                      <span className="text-white">{hovered.meaning}</span>
                    </h2>
                  )}
                </div>
                <Image
                  width={512}
                  height={512}
                  src={hovered.projectSrc}
                  alt={`Tatuaż Grudziądz Wzory ${hovered.title}`}
                  className="bg-[#303030] border-2 border-[#606060] w-full p-6 mt-6 lg:-ml-3"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* tattoomap */}

      <div className="flex items-end justify-end w-full flex-col font-anton">
        <div className="z-50 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 min-h-screen gap-3 lg:w-[60vw] px-3 lg:px-12 py-12 bg-[#404040] border-l-2 border-[#505050]">
          <div className="absolute left-3 top-2 lg:top-3 z-[50]">
            <div className="w-6 h-6 group">
              <FaInfoCircle className="text-3xl text-gray-500" />
              <h2 className="bg-white text-black  rounded-md p-3 hidden group-hover:block w-[90vw] lg:w-[40vw] font-coco  text-base lg:text-xl  text-left  mt-6 lg:mt-3 drop-shadow-md shadow-black border-b border-[#505050] lg:pb-3">
                Każdy z tych tatuaży jest dostępny{" "}
                <span className="font-bold">tylko raz</span>. Po wybraniu przez
                Ciebie konkretnego projektu, zostaje on{" "}
                <span className="font-bold">
                  niezwłocznie usunięty z tej listy
                </span>
                , gwarantując, że będziesz jedyną osobą noszącą ten wyjątkowy
                wzór. Miłego przeglądania i do zobaczenia w studiu!
              </h2>
            </div>
          </div>
          {tattoos?.map((item: Tattoo, i: any) => (
            <>
              <button
                title="Kliknij, by zobaczyć więcej"
                onClick={() => {
                  !selectedByUser && setSelectedByUser(item);
                  selectedByUser && setHovered(item), setSelectedByUser(item);
                }}
                onMouseEnter={() => handleItemHover(item, i)}
                onMouseLeave={() => {
                  !selectedByUser && handleItemUnhover;
                }}
                key={i}
                className="hidden aspect-square h-full relative lg:flex items-center justify-center"
              >
                <div
                  className={`w-full h-full border-2 border-[#606060] hover:border-green-400 ${
                    selectedByUser === item && "border-green-400"
                  } cursor-pointer flex items-center justify-center p-2 bg-[#303030] `}
                >
                  <Image
                    src={item.projectSrc}
                    width={216}
                    height={216}
                    alt=""
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
              </button>
              <Link
                href={`/studio-tatuazu-grudziadz-wzory/${polishToEnglish(
                  item.title
                )}`}
                key={i}
                className="z-[50] lg:hidden aspect-square h-full relative flex items-center justify-center"
              >
                <div
                  className={`w-full h-full border-2 border-[#606060] hover:border-green-400 ${
                    selectedByUser === item && "border-green-400"
                  } cursor-pointer flex items-center justify-center p-2 bg-[#303030] `}
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
            </>
          ))}
        </div>
      </div>
      <div className="mx-auto flex flex-col  text-white w-full pb-6 font-anton lg:justify-end lg:items-end">
        <div className="lg:w-[60vw] lg:pr-8">
          <DidYouKnow array={array} />
        </div>
      </div>
      <div className="mx-auto mt-12 flex flex-col lg:items-end lg:justify-end text-white w-full pb-6 font-anton">
        <div className="lg:w-[60vw] justify-center items-center flex text-center flex-col">
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
