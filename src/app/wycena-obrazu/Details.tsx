import { FaCheck, FaLongArrowAltRight } from "react-icons/fa";

export default function Details({
  sizes,
  setUserInput,
  userInput,
}: {
  sizes: any;
  setUserInput: any;
  userInput: any;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {sizes.map((item: any, i: any) => (
        <>
          {item.size === userInput.size.name &&
            item.details.map((detail: any, k: any) => (
              <button
                onClick={() => setUserInput({ ...userInput, details: detail })}
                key={k}
                className={`${
                  userInput.details.name === detail.name
                    ? "bg-purple-400"
                    : "bg-white hover:bg-purple-400"
                }  group  duration-300 w-full flex justify-between flex-row items-center border border-purple-400 rounded-3xl overflow-hidden`}
              >
                <div
                  className={`min-w-[5vw] duration-500 text-left h-full py-3 lg:py-6 px-3 lg:px-6 text-white font-bold text-sm lg:text-xl bg-purple-400 ${
                    userInput.details.name === detail.name
                      ? "underline min-w-3/4"
                      : "group-hover:underline group-hover:w-3/4"
                  }`}
                >
                  {detail.name}
                </div>

                <div
                  className={`${
                    userInput.details.name === detail.name
                      ? ""
                      : "group-hover:hidden"
                  } text-gray-500 text-sm px-3 lg:px-6 font-bold duration-300 w-max`}
                >
                  {userInput.details.name === detail.name ? (
                    <div className="flex flex-row items-center text-white">
                      Wybrano <FaCheck className="ml-3 text-green-400" />
                    </div>
                  ) : (
                    <>+{detail.price}zł</>
                  )}
                </div>
                {userInput.details.name !== detail.name && (
                  <div
                    className={`flex-row items-center text-white text-sm lg:text-xl px-3 lg:px-6 font-bold group-hover:flex hidden duration-300 w-max`}
                  >
                    Wybierz <FaLongArrowAltRight className="ml-3" />
                  </div>
                )}
              </button>
            ))}
        </>
      ))}
    </div>
  );
}
