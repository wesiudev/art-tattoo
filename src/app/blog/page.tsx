import Image from "next/image";
import Link from "next/link";
import Orders from "../shop/components/Orders";

export default function Blog() {
  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen">
      <h1 className="text-3xl text-center text-zinc-700 drop-shadow-lg shadow-black font-bold">
        Jaka tematyka Cię interesuje?
      </h1>
      <h2 className="text-lg text-center text-zinc-500 drop-shadow-lg shadow-black font-bold">
        Prowadzę bloga o tatuażu i sztuce. Znajdziesz tu wiele ciekawych
        informacji i poradników dotyczących obu tych tematów.
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-12">
        <Link
          href="/blog/art"
          title="Przejdź do bloga o sztuce"
          className="group aspect-square bg-slate-200 rounded-xl border border-gray-100 drop-shadow-lg shadow-black w-[80vw] lg:w-[30vw]"
        >
          <Image
            src="/images/blog/art-blog-link.webp"
            width={1080}
            height={1080}
            alt=""
            className="group-hover:scale-95 duration-150 w-full h-full object-cover rounded-xl"
          />
        </Link>
        <Link
          href="/blog/tattoo"
          title="Przejdź do bloga o tatuażach"
          className="group aspect-square bg-slate-200 rounded-xl border border-gray-100 drop-shadow-lg shadow-black w-[80vw] lg:w-[30vw]"
        >
          <Image
            src="/images/blog/tattoo-blog-link.webp"
            width={1080}
            height={1080}
            alt=""
            className="group-hover:scale-95 duration-150 w-full h-full object-cover rounded-xl"
          />
        </Link>
      </div>
    </div>
  );
}
