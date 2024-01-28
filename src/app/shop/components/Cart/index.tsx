"use client";

import { removeFromCart } from "@/redux/slices/shopSlice";
import { ArtworkData } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import Image from "next/image";
import { spawn } from "child_process";

/* eslint-disable @next/next/no-img-element */

export default function Cart({
  isCartOpen,
  setCartOpen,
}: {
  isCartOpen: boolean;
  setCartOpen: (isCartOpen: boolean) => void;
}) {
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.shop.cart);
  // useEffect(() => {
  //   const cart = localStorage.getItem("cart");
  //   if (cart) {
  //     dispatch(setCart(JSON.parse(cart)));
  //   }
  // }, [cart]);
  return (
    <>
      <button
        onClick={() => setCartOpen(!isCartOpen)}
        className={`hover:scale-125 duration-200  flex flex-row items-center group  p-6 pt-12 pl-12  bg-purple-400 rounded-tl-full  fixed bottom-0 right-0  z-[150]`}
      >
        <div className="absolute rounded-full p-1 h-max w-auto text-white font-bold text-2xl  right-3 bottom-3  aspect-square">
          {cart?.length === 0 ? "" : cart?.length}
        </div>
        <FaShoppingCart className="mr-2 text-5xl  text-white " />
      </button>

      {isCartOpen && (
        <div
          className="max-h-[76vh] overflow-y-scroll borderBar border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 h-max w-[95vw] lg:w-max fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
          aria-modal="true"
          role="dialog"
        >
          {cart?.length !== 0 && (
            <span className="text-zinc-800 font-bold">Twój koszyk</span>
          )}
          <div className="flex flex-col items-center justify-center w-full">
            {cart.length === 0 && (
              <>
                <FaShoppingCart className="text-7xl text-gray-400 mt-12" />
                <p className="text-gray-400 mt-5 text-center">
                  Twój koszyk jest pusty...
                </p>
              </>
            )}
            {cart?.length !== 0 && (
              <div className="grid grid-cols-1 mt-16 text-zinc-800 drop-shadow-md shadow-black w-full">
                {cart?.map((item: ArtworkData, i: any) => (
                  <div key={i}>
                    <div className="flex flex-row justify-between bg-gray-200 w-full">
                      <div className="flex flex-row items-start w-full p-2">
                        <div className="aspect-square w-24 h-24">
                          <Image
                            width={244}
                            height={244}
                            src={item?.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="pl-2 w-full">
                          <div className="w-full flex flex-row justify-between">
                            <Link
                              href={`/shop/${item.category}/${item.slug}`}
                              className="text-lg font-bold"
                            >
                              {item.title}{" "}
                            </Link>
                            <p className="font-bold text-lg px-2">
                              {item.price}zł
                            </p>
                          </div>
                          <p className="text-gray-500 text-sm">
                            {item.dimensions}
                          </p>
                          <button
                            onClick={() => {
                              dispatch(removeFromCart(item));
                            }}
                            className="text-sm text-gray-500 underline hover:text-gray-600"
                          >
                            usuń
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-300 my-4" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-8 space-y-6 relative">
            <div className="space-y-4 text-center">
              {cart.length === 0 && (
                <button
                  disabled={!cart.length}
                  className="disabled:cursor-not-allowed hover:disabled:blur-sm duration-200 block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-900 w-full"
                >
                  Do płatności
                </button>
              )}
              {cart.length !== 0 && (
                <Link
                  title="Przejdź do płatności"
                  href="/checkout"
                  className="duration-200 block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-900 w-full"
                >
                  Do płatności
                </Link>
              )}
              <button
                onClick={() => setCartOpen(false)}
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Kontynuuj zakupy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
