"use client";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { FaCheck, FaImage, FaSmileBeam } from "react-icons/fa";
import SpinningWheel from "./SpinningWheel";
var randomId = require("random-id");
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [chosenImg, setChosenImg] = useState<any>();
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/imagesMailer`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, message, chosenImg }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      if (res?.message?.accepted?.length > 0) {
        setName("");
        setEmail("");
        setMessage("");
        setChosenImg("");
        setIsSent(true);
      } else {
        alert("Coś poszło nie tak, spróbuj ponownie później");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!name) {
      newErrors.name = "Proszę wpisać imię";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Proszę wpisać adres e-mail";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Proszę wpisać poprawny adres e-mail";
      isValid = false;
    }

    if (!message) {
      newErrors.message = "Proszę wpisać wiadomość";
      isValid = false;
    } else if (message.length < 10) {
      newErrors.message = "Wiadomość powinna mieć co najmniej 10 znaków";
      isValid = false;
    }
    setTimeout(() => {
      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 7500);
    setErrors(newErrors);
    return isValid;
  };
  function handleImageUpload(img: File) {
    setLoading(true);
    const randId = `image-${randomId(20, "aA0")}`;
    const imageRef = ref(storage, randId);
    uploadBytes(imageRef, img).then(() =>
      getDownloadURL(imageRef).then((url) => {
        setChosenImg(url);
        setLoading(false);
      })
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6  mx-auto   md:rounded-lg bg-gray-200 font-coco"
    >
      <div className="flex flex-col md:space-x-6 md:flex-row w-full  p-3 lg:px-6 lg:py-3 rounded-t-md">
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-zinc-700 font-bold mb-2">
            Imię
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="phone" className="block text-zinc-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
      </div>
      <div className="mb-4 rounded-b-md p-3 lg:px-6 lg:pb-12">
        <label htmlFor="message" className="block text-zinc-700 font-bold mb-2">
          Wiadomość
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          rows={5}
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="flex flex-row items-center justify-between mr-3">
          <div className="w-full">
            <input
              disabled={isSent}
              id="image"
              type="file"
              accept="image/*"
              onClick={() => {
                chosenImg && setChosenImg("");
              }}
              onChange={(event: any) => {
                handleImageUpload(event.target.files[0]);
              }}
              className="hidden"
            />
            <label htmlFor="image">
              <div className="px-3 flex items-center justify-center w-full py-2 bg-gray-700 hover:bg-gray-800 rounded-md cursor-pointer">
                {!chosenImg ? (
                  <>
                    {!loading ? (
                      <FaImage className="text-white mr-2" />
                    ) : (
                      <SpinningWheel />
                    )}
                  </>
                ) : (
                  <FaCheck className="text-green-400 mr-2" />
                )}
                <span className="text-white font-bold">
                  {chosenImg ? (
                    "Załączono obrazek"
                  ) : (
                    <>{loading ? "" : "Załącz obrazek"}</>
                  )}
                </span>
              </div>
            </label>
          </div>
        </div>
        <button
          disabled={loading || isSent}
          type="submit"
          className="disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white-500 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSent ? (
            <div className="flex flex-row items-center">
              <FaCheck className="mr-3 text-green-500 text-xl" />{" "}
              <span className="text-white">Wiadomość wysłana</span>
            </div>
          ) : (
            <>{loading ? "Ładowanie..." : "Wyślij"}</>
          )}
        </button>
      </div>
      <div
        className={`${
          isSent ? "my-6  p-3" : "my-0 p-0"
        }  duration-500 flex flex-row items-center  w-full justify-center bg-[#282828]  rounded-lg`}
      >
        {isSent && (
          <>
            <span className="text-white text-center flex flex-row items-center justify-center font-light">
              Dziękuję za wiadomość. Odezwę się niedługo!{" "}
              <FaSmileBeam className="ml-3 text-yellow-400 text-2xl" />
            </span>
          </>
        )}
      </div>
    </form>
  );
}
