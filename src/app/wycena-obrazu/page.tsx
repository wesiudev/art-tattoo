"use client";
import Link from "next/link";
import TopBar from "../(home)/components/ShopHero/TopBar";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Sizes from "./Sizes";
import Media from "./Media";
import PrepareCart from "../(home)/components/PrepareCart";
import Details from "./Details";
import ImageInput from "./ImageInput";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { getPolishCurrency } from "../../../utils/getPolishCurrency";
export default function Page() {
  const [userInput, setUserInput] = useState({
    size: { name: "", price: 0 },
    media: { name: "", price: 0 },
    details: { name: "", price: 0 },
    images: ["", "", ""],
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(-1);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);
  function handleImageUpload(img: File, idx: number) {
    setLoading(idx);
    const id = uuidv4();
    const imageRef = ref(storage, `image-${id}`);

    uploadBytes(imageRef, img)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        setUserInput((prevUserInput) => {
          const newImages = [...prevUserInput.images];
          newImages[idx] = url;
          return { ...prevUserInput, images: newImages };
        });
      })
      .finally(() => setLoading(-1));
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.phoneNumber.length > 8 && userInput.phoneNumber.length < 11) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/surveyMailer`,
        {
          method: "POST",
          body: JSON.stringify({
            size: userInput.size.name,
            media: userInput.media.name,
            details: userInput.details.name,
            images: userInput.images,
            phoneNumber: userInput.phoneNumber,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setIsSent(true);
    } else {
      setError(true);
    }
  };
  return (
    <div className="bg-white min-h-screen w-full py-32 px-5 lg:px-[8vw] xl:px-[12vw] flex flex-col items-center justify-center font-coco">
      <TopBar />
      <PrepareCart />
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-12 text-zinc-800 drop-shadow-md shadow-black">
        Wycena obrazu na zamówienie
      </h1>
      <div className="bg-gray-100 rounded-xl border border-gray-400 p-6 lg:p-8 xl:p-10 2xl:p-12 !pb-6 w-full min-h-[60vh] flex flex-col justify-start">
        {isSent && (
          <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center text-gray-500">
            <div className="h-max my-auto">
              <div className="aspect-square h-24 w-24 bg-green-400 flex items-center justify-center rounded-full mx-auto mb-4">
                <FaCheck className="text-white h-12 w-12" />
              </div>
              Dziękuję za wypełnienie formularza.{" "}
              <br className="lg:block hidden" /> Skontaktuję się z tobą w
              najbliższy dzień roboczy!
            </div>
          </div>
        )}
        {!isSent && (
          <>
            {userInput.size.name === "" && (
              <>
                <h2 className="text-xl lg:text-3xl font-bold text-white bg-purple-400 w-max py-1 px-3 rounded-lg drop-shadow-md shadow-black">
                  Rozmiar obrazu
                </h2>
                <p className="text-gray-500 text-sm md:text-base my-6">
                  Wybierzmy najistotniejszy element obrazu, jakim jest jego
                  rozmiar, abyśmy mogli razem stworzyć dzieło dopasowane do
                  Twoich osobistych preferencji.
                </p>
                <Sizes
                  userInput={userInput}
                  sizes={sizes}
                  setUserInput={setUserInput}
                />
              </>
            )}
            {userInput.size.name !== "" && userInput.media.name === "" && (
              <>
                <h2 className="text-xl lg:text-3xl font-bold text-white bg-purple-400 w-max py-1 px-3 rounded-lg drop-shadow-md shadow-black">
                  Medium obrazu
                </h2>
                <p className="text-gray-500 text-sm md:text-base my-6">
                  Przechodząc do następnego kroku, zastanówmy się nad wyborem
                  odpowiednich mediów do stworzenia tego dzieła sztuki. Każde
                  medium niesie ze sobą unikalną siłę wyrazu i atmosferę.
                </p>
                <Media
                  userInput={userInput}
                  sizes={sizes}
                  setUserInput={setUserInput}
                />
                <div className="w-full flex justify-center mt-12">
                  <button
                    onClick={() =>
                      setUserInput({
                        ...userInput,
                        size: { name: "", price: 0 },
                        media: { name: "", price: 0 },
                      })
                    }
                    className="w-full rounded-3xl bg-gray-400 text-white font-bold text-xl py-2 px-6 md:w-max md:mx-auto hover:bg-gray-500 duration-300"
                  >
                    Powrót
                  </button>
                </div>
              </>
            )}
            {userInput.size.name !== "" && userInput.media.name !== "" && (
              <>
                <div>
                  <h2 className="text-xl lg:text-3xl font-bold text-white bg-purple-400 w-max py-1 px-3 rounded-lg drop-shadow-md shadow-black">
                    Ilość szczegółów
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base my-6">
                    W tym etapie masz możliwość wybrania ilości detali, które
                    dodadzą wyjątkowy charakter Twojemu dziełu sztuki. Ilość
                    detali wpłynie na ostateczny koszt zamówienia.
                  </p>
                </div>
                <Details
                  userInput={userInput}
                  sizes={sizes}
                  setUserInput={setUserInput}
                />
                <div className="w-full flex flex-col items-center justify-center mt-6">
                  {userInput.details.name !== "" && (
                    <>
                      <p className="mb-3 text-gray-500 ">
                        Jeśli to możliwe, załącz materiały, które mogą mi się
                        przydać do utworzenia twojego wymarzonego obrazu.
                      </p>
                      <ImageInput
                        loading={loading}
                        images={userInput.images}
                        handleImageUpload={handleImageUpload}
                      />
                    </>
                  )}
                  {error && (
                    <div className="text-center text-red-400 my-2">
                      Błędny numer telefonu
                    </div>
                  )}
                  {userInput.details.name === "" && (
                    <button className="w-full rounded-3xl bg-gray-300 text-zinc-400 font-bold text-xl py-2 px-6 md:w-max md:text-2xl md:mx-auto cursor-not-allowed duration-300">
                      Umów konsultację
                    </button>
                  )}
                  {userInput.details.name !== "" && (
                    <>
                      <div className="flex flex-row items-center">
                        Medium:{" "}
                        <span className="ml-1 font-bold text-purple-500">
                          {userInput.media.name}
                        </span>
                      </div>
                      <div className="flex flex-row items-center">
                        Rozmiar:{" "}
                        <span className="ml-1 font-bold text-purple-500">
                          {userInput.size.name}
                        </span>
                      </div>
                      <div className="flex flex-row items-center">
                        Ilość szczegółów:{" "}
                        <span className="ml-1 font-bold text-purple-500">
                          {userInput.details.name}
                        </span>
                      </div>
                      <p className="my-4 text-xl text-zinc-800">
                        Szacowany koszt:{" "}
                        <span className="font-bold text-purple-500 underline">
                          {getPolishCurrency(
                            userInput.details.price +
                              userInput.media.price +
                              userInput.size.price
                          )}
                        </span>
                      </p>

                      <form
                        className="flex flex-col w-full"
                        onSubmit={handleSubmit}
                      >
                        <input
                          type="text"
                          placeholder="Numer telefonu"
                          className="bg-white border-purple-400 rounded-md border-2 mb-6"
                          value={userInput.phoneNumber}
                          onChange={(e: any) =>
                            setUserInput({
                              ...userInput,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                        <button
                          type="submit"
                          className="w-full rounded-3xl bg-green-400 text-white font-bold text-xl py-2 px-6 md:w-max md:text-2xl md:mx-auto hover:bg-green-500 duration-300"
                        >
                          Umów konsultację
                        </button>
                      </form>
                    </>
                  )}
                  <button
                    onClick={() =>
                      setUserInput({
                        ...userInput,
                        media: { name: "", price: 0 },
                        details: { name: "", price: 0 },
                      })
                    }
                    className="w-full rounded-3xl bg-gray-400 text-white font-bold text-xl py-2 px-6 md:w-max md:mx-auto hover:bg-gray-500 duration-300 mt-3"
                  >
                    Powrót
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const sizes = [
  {
    size: "A5",
    price: 50,
    media: [
      { price: 35, name: "Kredki" },
      { price: 40, name: "Farby olejne" },
      { price: 35, name: "Akryle" },
      { price: 30, name: "Ołówek" },
      { price: 35, name: "Akwarele" },
    ],
    details: [
      { price: 10, name: "Mała" },
      { price: 20, name: "Średnia" },
      { price: 30, name: "Duża" },
      { price: 40, name: "Bardzo duża" },
    ],
  },
  {
    size: "A4",
    price: 100,
    media: [
      { price: 45, name: "Kredki" },
      { price: 55, name: "Farby olejne" },
      { price: 40, name: "Akryle" },
      { price: 35, name: "Ołówek" },
      { price: 45, name: "Akwarele" },
    ],
    details: [
      { price: 30, name: "Mała" },
      { price: 45, name: "Średnia" },
      { price: 65, name: "Duża" },
      { price: 120, name: "Bardzo duża" },
    ],
  },
  {
    size: "A3",
    price: 170,
    media: [
      { price: 125, name: "Kredki" },
      { price: 170, name: "Farby olejne" },
      { price: 120, name: "Akryle" },
      { price: 110, name: "Ołówek" },
      { price: 145, name: "Akwarele" },
    ],
    details: [
      { price: 40, name: "Mała" },
      { price: 60, name: "Średnia" },
      { price: 80, name: "Duża" },
      { price: 120, name: "Bardzo duża" },
    ],
  },
  {
    size: "40x50",
    price: 200,
    media: [
      { price: 180, name: "Kredki" },
      { price: 180, name: "Farby olejne" },
      { price: 170, name: "Akryle" },
      { price: 170, name: "Ołówek" },
      { price: 180, name: "Akwarele" },
    ],
    details: [
      { price: 50, name: "Mała" },
      { price: 70, name: "Średnia" },
      { price: 100, name: "Duża" },
      { price: 120, name: "Bardzo duża" },
    ],
  },
  {
    size: "50x70",
    price: 300,
    media: [
      { price: 200, name: "Kredki" },
      { price: 200, name: "Farby olejne" },
      { price: 190, name: "Akryle" },
      { price: 190, name: "Ołówek" },
      { price: 200, name: "Akwarele" },
    ],
    details: [
      { price: 60, name: "Mała" },
      { price: 80, name: "Średnia" },
      { price: 100, name: "Duża" },
      { price: 200, name: "Bardzo duża" },
    ],
  },
  {
    size: "60x80",
    price: 370,
    media: [
      { price: 250, name: "Kredki" },
      { price: 250, name: "Farby olejne" },
      { price: 240, name: "Akryle" },
      { price: 240, name: "Ołówek" },
      { price: 250, name: "Akwarele" },
    ],
    details: [
      { price: 70, name: "Mała" },
      { price: 90, name: "Średnia" },
      { price: 180, name: "Duża" },
      { price: 300, name: "Bardzo duża" },
    ],
  },
  {
    size: "100x70",
    price: 450,
    media: [
      { price: 350, name: "Kredki" },
      { price: 350, name: "Farby olejne" },
      { price: 340, name: "Akryle" },
      { price: 340, name: "Ołówek" },
      { price: 350, name: "Akwarele" },
    ],
    details: [
      { price: 100, name: "Mała" },
      { price: 140, name: "Średnia" },
      { price: 190, name: "Duża" },
      { price: 300, name: "Bardzo duża" },
    ],
  },
];
