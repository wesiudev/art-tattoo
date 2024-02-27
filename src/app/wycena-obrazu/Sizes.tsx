import { FaCheck, FaLongArrowAltRight } from "react-icons/fa";

export default function Sizes({
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
        <button
          onClick={() =>
            setUserInput({
              ...userInput,
              size: { price: item.price, name: item.size },
            })
          }
          key={i}
          className={`${
            userInput.size === item.size
              ? "bg-purple-400"
              : "bg-white hover:bg-purple-400"
          }  group  duration-300 w-full flex justify-between flex-row items-center border border-purple-400 rounded-3xl overflow-hidden`}
        >
          <div
            className={`min-w-[5vw] duration-500 text-left h-full py-3 lg:py-6 px-3 lg:px-6 text-white font-bold text-lg lg:text-xl bg-purple-400 ${
              userInput.size === item.size
                ? "underline min-w-3/4"
                : "group-hover:underline group-hover:w-3/4"
            }`}
          >
            {item.size}
          </div>

          <div
            className={`${
              userInput.size === item.size ? "" : "group-hover:hidden"
            } text-gray-500 text-sm px-3 lg:px-6 font-bold duration-300 w-max`}
          >
            {userInput.size === item.size ? (
              <div className="flex flex-row items-center text-white">
                Wybrano <FaCheck className="ml-3 text-green-400" />
              </div>
            ) : (
              <>
                od {item.price + item.details[0].price + item.media[0].price}zł
              </>
            )}
          </div>
          {userInput.size !== item.size && (
            <div
              className={`flex-row items-center text-white text-sm lg:text-xl px-3 lg:px-6 font-bold group-hover:flex hidden duration-300 w-max`}
            >
              Wybierz <FaLongArrowAltRight className="ml-3" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
