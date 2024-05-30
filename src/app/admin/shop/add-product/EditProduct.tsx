"use client";
var randomId = require("random-id");
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, updateProduct } from "../../../../firebase/index";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Image from "next/image";
import { ArtworkData } from "@/types";

export default function EditProduct({
  product,
  initialState,
  setEditingProduct,
}: {
  product: any;
  initialState: any;
  setEditingProduct: any;
}) {
  const [artworkData, setArtworkData] = useState(product);
  const [chosenImg, setChosenImg] = useState<any>();
  const [justDeleted, setJustDeleted] = useState<any[]>([]);
  const [showMessage, setShowMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sectionInput, setSectionInput] = useState({
    title: "",
    content: "",
  });
  const categories = ["sticker", "artwork", "inspiration", "print"];

  function handleImageUpload(img: File) {
    const randId = `image-${randomId(20, "aA0")}`;
    const imageRef = ref(storage, randId);
    uploadBytes(imageRef, img).then(() =>
      getDownloadURL(imageRef).then((url) => {
        setArtworkData((prevData: any) => ({
          ...prevData,
          images: [...(prevData.images || []), url],
        }));
      })
    );
  }
  function handleArtworkDataChange(key: keyof ArtworkData, value: any) {
    setArtworkData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  }
  return (
    <div>
      <div className="bg-white p-6 rounded-xl  border-4 border-black mb-6">
        <h1 className="text-3xl w-max mx-auto font-bold text-zinc-700 drop-shadow shadow-black">
          DODAJESZ NOWY OBRAZ NA SKLEP
        </h1>
        <div className="flex flex-col w-full space-x-12 items-center justify-center">
          <div className="grid grid-cols-2">
            {artworkData.images.length !== 0 && (
              <>
                {artworkData.images.map((item: any, i: any) => (
                  <Image
                    key={i}
                    src={item}
                    width={512}
                    height={512}
                    alt=""
                    className={`${
                      isLoading ? "blur-sm" : "blur-none"
                    } duration-500 h-[300px] w-auto mt-12 mx-auto border-8 border-green-500 rounded-xl bg-green-300`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="mt-12">
            <div className="h-full w-full bg-gray-400 text-white flex flex-col items-center justify-center">
              <input
                className="w-full h-24 relative before:left-0 top-0 before:absolute before:h-full before:w-full before:bg-gray-500 before:text-white before:text-3xl before:text-center before:flex before:items-center before:justify-center  before:content-['dodaj_więcej']"
                type="file"
                accept="image/*"
                onChange={(event: any) => {
                  handleImageUpload(event.target.files[0]);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 2000);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6">
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Tytuł</span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.title ? "border-2 border-green-500" : "border-2"
              }`}
              type="text"
              value={artworkData.title}
              onChange={(e) => handleArtworkDataChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Opis</span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.description
                  ? "border-2 border-green-500"
                  : "border-2"
              }`}
              type="text"
              value={artworkData.description}
              onChange={(e) =>
                handleArtworkDataChange("description", e.target.value)
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Artysta</span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.artist ? "border-2 border-green-500" : "border-2"
              }`}
              type="text"
              value={artworkData.artist}
              onChange={(e) =>
                handleArtworkDataChange("artist", e.target.value)
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Rok</span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.year ? "border-2 border-green-500" : "border-2"
              }`}
              type="number"
              value={artworkData.year}
              onChange={(e) =>
                handleArtworkDataChange("year", parseInt(e.target.value))
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Technika</span>{" "}
            <span className="flex flex-row items-center my-3">
              <FaInfoCircle className="text-blue-500 mr-3 h-8 w-8" /> np. Obraz
              na płótnie namanowany farbami akrylowymi (słowa kluczowe
              &quot;Obraz na płótnie&quot;)
            </span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.medium ? "border-2 border-green-500" : "border-2"
              }`}
              type="text"
              value={artworkData.medium}
              onChange={(e) =>
                handleArtworkDataChange("medium", e.target.value)
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold text-3xl">Wymiary</span>
            <span className="flex flex-row items-center my-3">
              <FaInfoCircle className="text-blue-500 mr-3 h-8 w-8" /> np. 30x50,
              20x20, można też napisać zdanie na ten temat
            </span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.dimensions
                  ? "border-2 border-green-500"
                  : "border-2"
              }`}
              type="text"
              value={artworkData.dimensions}
              onChange={(e) =>
                handleArtworkDataChange("dimensions", e.target.value)
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Cena</span>
            <input
              className={`font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.price ? "border-2 border-green-500" : "border-2"
              }`}
              type="number"
              value={artworkData.price}
              onChange={(e) =>
                handleArtworkDataChange("price", parseInt(e.target.value))
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">
              Print też? (zaznacz jak tak)
            </span>
            <input
              className={`h-24 w-24 font-bold text-zinc-700 drop-shadow-md shadow-black p-3 rounded-md ${
                artworkData.isPrint ? "border-2 border-green-500" : "border-2"
              }`}
              type="checkbox"
              checked={artworkData.isPrint}
              onChange={(e) =>
                handleArtworkDataChange("isPrint", e.target.checked)
              }
            />
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white border-4 border-black w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-5 text-3xl">Kategoria</span>
            <div className="group ">
              <h1 className="flex flex-row items-center mb-5 cursor-pointer">
                <FaInfoCircle className="w-8 h-8 mr-3 text-blue-500" />
                Ważne informacje
              </h1>

              <div className="grid-cols-1 mb-5 gap-6 hidden group-hover:grid duration-500">
                <div className="flex flex-col bg-slate-700 p-3 rounded-xl">
                  <p className="text-white">sticker - Wszystkie naklejki</p>
                  <h2 className="text-green-500">
                    /shop/sticker/nazwa-produktu
                  </h2>
                </div>
                <div className="flex flex-col bg-slate-700 p-3 rounded-xl">
                  <p className="text-white">
                    artwork - Wszystkie prace oryginalne (które zawierają print
                    lub nie)
                  </p>
                  <h2 className="text-green-500">
                    /shop/artwork/nazwa-produktu
                  </h2>
                </div>
                <div className="flex flex-col bg-slate-700 p-3 rounded-xl">
                  <p className="text-white">
                    inspiration - generacje AI, zdjęcia - po prostu wszystko
                    (warto rozwijać tą sekcję)
                  </p>
                  <h2 className="text-green-500">
                    /shop/inspiration/nazwa-produktu
                  </h2>
                </div>
                <div className="flex flex-col bg-slate-700 p-3 rounded-xl">
                  <p className="text-white">
                    print - Wszystko co nie jest inspiration (jak dodajesz obraz
                    oryginalny, który ma printy, to znajdzie się też tutaj z
                    automatu, wybierz opcję artwork)
                  </p>
                  <h2 className="text-green-500">/shop/print/nazwa-produktu</h2>
                </div>
              </div>
            </div>
            <select
              className="p-3 drop-shadow-md shadow-black rounded-md border-2 border-black mt-3"
              id="category"
              value={artworkData.category}
              onChange={(e) =>
                setArtworkData({ ...artworkData, category: e.target.value })
              }
            >
              <option value="">Wybierz kategorię (ważne)</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 mx-auto w-max mb-6 space-x-12">
        <button
          disabled={isLoading}
          onClick={() => {
            updateProduct(artworkData.id, artworkData),
              setShowMessage("dodano");
            setTimeout(() => {
              setShowMessage("");
              setChosenImg(""),
                setArtworkData(initialState),
                setSectionInput({ title: "", content: "" });
              setEditingProduct("");
            }, 3000);
          }}
          className="rounded-xl px-12 bg-green-500 hover:bg-green-400 p-3 duration-200 text-white text-2xl disabled:cursor-not-allowed disabled:bg-green-200"
        >
          {isLoading ? "ŁADOWANIE" : "DODAJ"}
        </button>
        <button
          onClick={() => {
            setChosenImg(""),
              setArtworkData(initialState),
              setSectionInput({ title: "", content: "" });
            setEditingProduct("");
          }}
          className="rounded-xl px-12 bg-red-500 hover:bg-red-400 p-3 duration-200 text-white text-2xl mt-3"
        >
          ODRZUĆ
        </button>
      </div>
    </div>
  );
}
