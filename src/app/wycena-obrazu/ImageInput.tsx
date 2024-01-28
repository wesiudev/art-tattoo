import Image from "next/image";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

export default function ImageInput({
  images,
  loading,
  handleImageUpload,
}: {
  images: any;
  loading: any;
  handleImageUpload: any;
}) {
  const [currentOpen, setCurrentOpen] = useState(-1);
  return (
    <>
      {currentOpen !== -1 && (
        <div
          onClick={() => setCurrentOpen(-1)}
          className="z-[500] fixed left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full"
        >
          <div className="max-h-[80vh] w-[90%] overflow-y-scroll">
            <Image
              src={images[currentOpen]}
              width={1024}
              height={1024}
              alt=""
              className="w-full mx-auto"
            />
          </div>
        </div>
      )}
      <div
        className={`w-full mx-auto flex flex-row items-center justify-center space-x-6 mb-6`}
      >
        {images.map((item: any, idx: number) => (
          <div className="h-max" key={idx}>
            {item === "" ? (
              <>
                <input
                  id={`input${idx}`}
                  type="file"
                  accept="image/*"
                  onChange={(event: any) => {
                    handleImageUpload(event.target.files[0], idx);
                  }}
                  className="hidden"
                />
                <label htmlFor={`input${idx}`}>
                  <div className="p-3 aspect-square flex items-center justify-center bg-purple-400 border-2 border-transparent hover:bg-purple-300 duration-300 hover:border-purple-400 rounded-lg cursor-pointer">
                    {loading == idx ? (
                      <Image
                        width={24}
                        height={24}
                        className="h-6 w-6"
                        src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
                        alt=""
                      />
                    ) : (
                      <FaImage className="text-5xl text-white" />
                    )}
                  </div>
                </label>
              </>
            ) : (
              <div
                key={idx}
                className="relative border-2 border-transparent hover:border-purple-400 aspect-square rounded-lg cursor-pointer"
              >
                <div
                  onClick={() => setCurrentOpen(idx)}
                  className="w-full h-full"
                >
                  <Image
                    src={item}
                    alt=""
                    width={256}
                    height={256}
                    className="bg-cover rounded-lg object-cover h-auto w-full aspect-square"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
