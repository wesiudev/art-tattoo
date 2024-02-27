import { getBlogPosts } from "@/firebase";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default async function Blog() {
  const posts = await getBlogPosts();
  const isArtBlogAvailable = posts?.posts?.some(
    (post: Post) => post.blogType === "art"
  );
  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen">
      <h1 className="text-3xl text-center text-zinc-700 drop-shadow-lg shadow-black font-bold">
        Jaka tematyka Cię interesuje?
      </h1>
      <h2 className="text-lg text-center text-zinc-500 drop-shadow-lg shadow-black font-bold">
        Prowadzę bloga o tatuażach i sztuce. Znajdziesz tu wiele ciekawych
        informacji i poradników dotyczących obu tych tematów.
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-12">
        {!isArtBlogAvailable && (
          <Link
            href="/blog/"
            title="Przejdź do bloga o sztuce"
            className="relative group aspect-square bg-slate-200 rounded-xl border border-gray-100 drop-shadow-lg shadow-black w-[80vw] lg:w-[30vw]"
          >
            <div className="z-50 w-full h-full absolute left-0 top-0 rounded-xl bg-black bg-opacity-70 flex items-center justify-center text-center text-white cursor-not-allowed flex-col">
              <FaLock className="h-8 w-8 mb-3" />
              Już wkrótce
            </div>
            <Image
              src="/images/blog/art-blog-link.webp"
              width={1080}
              height={1080}
              alt=""
              className="group-hover:scale-95 duration-150 w-full h-full object-cover rounded-xl"
            />
          </Link>
        )}
        {isArtBlogAvailable && (
          <Link
            href="/blog/art"
            title="Przejdź do bloga o sztuce"
            className="relative group aspect-square bg-slate-200 rounded-xl border border-gray-100 drop-shadow-lg shadow-black w-[80vw] lg:w-[30vw]"
          >
            <Image
              src="/images/blog/art-blog-link.webp"
              width={1080}
              height={1080}
              alt=""
              className="group-hover:scale-95 duration-150 w-full h-full object-cover rounded-xl"
            />
          </Link>
        )}
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
