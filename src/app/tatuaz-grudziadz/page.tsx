"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  CommunityPart,
  IntroPart,
  RoadMapPart,
  TeamsDescPart,
  TeamsPart,
} from "@/views/landing";
import { Footer, Header } from "@/layouts";
import CookieInfo from "@/components/cookies/CookieInfo";
import Loader from "@/components/loader/Loader";
import { Tattoo } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { setTattoos } from "@/redux/slices/tattoosSlice";

export default function Page() {
  const [y, setY] = useState(0);
  const [mobile, setMobile] = useState(false);
  const handleScroll = useCallback(
    async (e: any) => {
      const currentTarget = e.currentTarget;
      const rmXY: any = [];
      const rmMXY: any = [];
      setY(currentTarget.scrollY);
      for (let i = 1; i <= 5; i++) {
        if (!mobile) {
          await rmXY.push(
            document.getElementById("rmd" + i)?.getBoundingClientRect()
          );
        } else {
          await rmMXY.push(
            document.getElementById("rmd-m" + i)?.getBoundingClientRect()
          );
        }
      }

      if (y > currentTarget.scrollY) {
        for (let j = 0; j < 5; j++) {
          if (!mobile) {
            if (rmXY[j]?.top > window.innerHeight) {
              const activeDiv: any = document.getElementById("rmd" + (j + 1));
              activeDiv.style.transform = "translateY(100px)";
              activeDiv.style.opacity = "0";
            }
          } else {
            if (rmMXY[j]?.top > window.innerHeight) {
              const activeDiv: any = document.getElementById("rmd-m" + (j + 1));
              activeDiv.style.transform = "translateY(100px)";
              activeDiv.style.opacity = "0";
            }
          }
        }
      } else if (y < currentTarget.scrollY) {
        for (let j = 0; j < 5; j++) {
          if (!mobile) {
            if (rmXY[j]?.top >= 0 && rmXY[j].top <= window.innerHeight) {
              const activeDiv: any = document.getElementById("rmd" + (j + 1));
              activeDiv.style.transform = "translateY(0)";
              activeDiv.style.opacity = "1";
            }
          } else {
            if (rmMXY[j]?.top >= 0 && rmMXY[j].top <= window.innerHeight) {
              const activeDiv: any = document.getElementById("rmd-m" + (j + 1));
              activeDiv.style.transform = "translateY(0)";
              activeDiv.style.opacity = "1";
            }
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () =>
      setMobile(window.innerWidth >= 1024 ? false : true)
    );
    setY(window.scrollY);
    setMobile(window.innerWidth >= 1024 ? false : true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {});
    };
  }, [handleScroll]);
  const dispatch = useDispatch();
  const tattoos: Tattoo[] = useSelector((state: any) => state.tattoos);
  useEffect(() => {
    if (tattoos.length === 0) {
      fetch(`/api/tattoo`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTattoos(data));
        });
    }
  }, []);
  return (
    <div
      id="art"
      className="pt-[140px] transition duration-200 md:pt-50 overflow-x-hidden"
    >
      <Header />
      <div className="max-w-screen-lg md:w-9/12 xl:w-full mx-auto ">
        <Loader />
        <CookieInfo />
        <IntroPart />
        <TeamsPart />
        <RoadMapPart />
        <TeamsDescPart />
        <CommunityPart />
        <Footer />
      </div>
    </div>
  );
}
