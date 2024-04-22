"use client";
import {
  HeaderContainer,
  HeaderWrapper,
  MenuItem,
  MenuLists,
  SideBarItem,
  SidebarOverlay,
  SideBarWrapper,
} from "./header.styled";
import { useEffect, useState } from "react";
import Image from "next/image";
const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(1);
  const [menuShow, setMenuShow] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setMobile(window.innerWidth >= 1024 ? false : true)
    );
    setMobile(window.innerWidth >= 1024 ? false : true);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const handleScroll = () => {
    const header: any = document.getElementById("header");
    if (document.documentElement.scrollTop > 30) {
      header.style.marginTop = 0;
    } else {
      header.style.marginTop = "30px";
    }

    const menuY: any = [
      {
        id: "art",
        y: document.getElementById("art")?.getBoundingClientRect().top,
      },
      {
        id: "about",
        y: document.getElementById("about")?.getBoundingClientRect().top,
      },
      {
        id: "tattoo",
        y: document.getElementById("tattoo")?.getBoundingClientRect().top,
      },
      {
        id: "contact",
        y: document.getElementById("contact")?.getBoundingClientRect().top,
      },
    ];

    for (let i = 0; i < 4; i++) {
      if (menuY[i].y >= 0 && menuY[i].y <= window.innerHeight) {
        setActive(i + 1);
      }
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContainer id="header">
        {!mobile && (
          <MenuLists>
            <MenuItem href="/" className="!text-yellow-400 ">
              sklep
            </MenuItem>
            <MenuItem href="#art" active={active === 1}>
              sztuka
            </MenuItem>
            <MenuItem href="#tattoo" active={active === 3}>
              wzory
            </MenuItem>
          </MenuLists>
        )}
        <a href="#art">
          <Image
            width={600}
            height={300}
            src="/images/image/common/blackbellLogo.png"
            alt="logoSVG"
            className="h-[40px] lg:h-[60px] w-auto"
            id="logoImg"
          />
        </a>
        {!mobile && (
          <MenuLists>
            <MenuItem href="#about" active={active === 2}>
              tattoo
            </MenuItem>
            <MenuItem href="#contact" active={active === 4}>
              kontakt
            </MenuItem>
            {/* <MenuItem href="/blog" className="!text-yellow-400">
              BLOG
            </MenuItem> */}
          </MenuLists>
        )}
        {/* <MenuItem > */}
        {mobile && (
          <button
            className={`relative !z-[2000] menu ${menuShow ? "opened" : ""}`}
            onClick={() => setMenuShow(!menuShow)}
            aria-expanded={menuShow}
            aria-label="Main Menu"
          >
            <svg width="65" height="65" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        )}
      </HeaderContainer>
      {mobile && (
        <SideBarWrapper show={menuShow} className="pt-36">
          <div className="logo-wrapper !items-start">
            <Image
              id="logoImg"
              width={600}
              height={300}
              src="/images/image/common/blackbellLogo.png"
              alt="logoSVG"
            />
          </div>
          <SideBarItem
            active={active === 1}
            onClick={() => setMenuShow(false)}
            href="#art"
            className="!text-2xl"
          >
            sztuka
          </SideBarItem>{" "}
          <SideBarItem
            active={active === 3}
            onClick={() => setMenuShow(false)}
            href="#tattoo"
            className="!text-2xl"
          >
            wzory
          </SideBarItem>
          <SideBarItem
            active={active === 2}
            onClick={() => setMenuShow(false)}
            href="#about"
            className="!text-2xl"
          >
            tattoo
          </SideBarItem>
          <SideBarItem
            active={active === 4}
            onClick={() => setMenuShow(false)}
            href="#contact"
            className="!text-2xl"
          >
            kontakt
          </SideBarItem>
          <SideBarItem
            onClick={() => setMenuShow(false)}
            href="/"
            className="!text-2xl"
          >
            sklep
          </SideBarItem>
          <SideBarItem
            onClick={() => setMenuShow(false)}
            href="/blog"
            className="!text-2xl"
          >
            blog
          </SideBarItem>
        </SideBarWrapper>
      )}
      {mobile && (
        <SidebarOverlay onClick={() => setMenuShow(false)} show={menuShow} />
      )}
    </HeaderWrapper>
  );
};

export default Header;
