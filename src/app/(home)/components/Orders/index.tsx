import Link from "next/link";
import ContactForm from "../ContactInfo/ContactForm";

export default function Orders() {
  return (
    <div className="relative bg-[#d1d3d6] bg-form-orders bg-no-repeat bg-cover font-coco w-full h-max">
      <button name="orders" className="absolute -top-[66px] left-0"></button>
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-[#303030]"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center bg-white p-3 lg:p-6 shadow-sm shadow-black rounded-xl">
          <h4 className="mb-6 font-cardo text-3xl font-bold tracking-tight text-zinc-800 drop-shadow-lg shadow-black sm:text-4xl sm:leading-none">
            Obrazy na zamówienie
          </h4>
          <p className="mb-6 text-base  tracking-wide text-gray-600 md:text-lg  drop-shadow-lg shadow-black">
            Oferuję wykonanie obrazów na zamówienie. Jeśli masz pomysł na obraz
            na płótnie, który chciałbyś/chciałabyś mieć na ścianie, wypełnij
            formularz lub{" "}
            <Link href="/wycena-obrazu" className="underline text-blue-500">
              otrzymaj darmową wycenę obrazu
            </Link>
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
