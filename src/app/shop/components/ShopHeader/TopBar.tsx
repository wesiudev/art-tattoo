"use client";
import Link from "next/link";
import { useState } from "react";
import { FaArtstation, FaHome, FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart";
import Image from "next/image";

export default function TopBar() {
  const [isMenuShow, setMenuShow] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <header>
      <nav className="fixed py-3 top-0 left-0 z-[60] border-b-2 border-[#606060] w-screen flex flex-row items-center justify-between px-5 lg:px-[8vw] xl:px-[12vw] bg-[#303030]">
        <Link
          href="/"
          className="text-white text-3xl lg:text-4xl flex flex-row items-center relative drop-shadow-md shadow-black font-coco px-0"
        >
          <Image
            src="/images/image/common/logobbwWhite.png"
            width={1024}
            height={1024}
            alt="Blackbell Art logo"
            className="h-[40px] w-auto"
          />
          Blackbell Art
        </Link>
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
        <div
          className={`font-coco fixed lg:relative right-0 top-0  lg:flex lg:h-max justify-center items-center flex flex-col space-y-6 lg:space-y-0 lg:flex-row  w-[100vw] lg:w-max  lg:justify-end lg:items-end  lg:pl-0 text-4xl lg:text-2xl lg:space-x-6 text-white
            ${
              isMenuShow
                ? "z-[55] bg-[#303030] h-screen"
                : "!z-[-25] h-[1vh] lg:z-[55]"
            }`}
        >
          <Link
            href="/"
            className={`${
              isMenuShow
                ? "scale-100 duration-500 delay-300"
                : "scale-0 lg:scale-100"
            } flex flex-row items-center group  lg:duration-150 lg:delay-0`}
          >
            <FaHome className="mr-2 group-hover:text-purple-300" />
            Strona główna
          </Link>
          <Link
            href="/shop"
            className={`${
              isMenuShow
                ? "scale-100 duration-300 delay-500"
                : "scale-0 lg:scale-100"
            } flex flex-row items-center hover:text-white lg:duration-150 lg:delay-0 group`}
          >
            <FaShoppingCart className="mr-2 group-hover:!text-green-300" />
            Sklep
          </Link>
          <Link
            href="/blog"
            className={`${
              isMenuShow
                ? "scale-100 duration-100 delay-700"
                : "scale-0 lg:scale-100"
            } flex flex-row items-center hover:text-white lg:duration-150 lg:delay-0 group`}
          >
            <FaArtstation className="mr-2 group-hover:!text-yellow-300" />
            Blog
          </Link>

          <Cart isCartOpen={isCartOpen} setCartOpen={setCartOpen} />
        </div>
      </nav>
    </header>
  );
}
