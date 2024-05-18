import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
async function getBlogData() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?secret=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 30 } }
  );
  const posts = req.json();
  return posts;
}
export default async function Page() {
  const { posts } = await getBlogData();

  return (
    <div className="mt-[66px]">
      <div
        className={`w-full px-5 lg:px-[8vw] xl:px-[12vw] bg-white pt-12 min-h-[60vh]`}
      >
        <span className="font-sans font-bold py-3">
          /{" "}
          <Link href="/" className="hover:underline hover:underline-offset-2">
            blackbellart
          </Link>{" "}
          /{" "}
          <Link
            href={`/blog`}
            className="hover:underline hover:underline-offset-2"
          >
            blog
          </Link>{" "}
          /{" "}
          <Link
            href={`/blog/art`}
            className="hover:underline hover:underline-offset-2"
          >
            sztuka
          </Link>{" "}
          /{" "}
        </span>
        <h1 className="text-3xl text-zinc-800 drop-shadow-lg shadow-black font-bold mt-12">
          Blog o sztuce
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {posts?.posts?.map((post: Post, i: number) => (
            <>
              {post.blogType === "art" && (
                <Link
                  href={`/blog/art/${post.url}`}
                  key={i}
                  className="group relative aspect-square h-max flex flex-col hover:bg-purple-300 hover:p-1 duration-300 ease-in-out rounded-lg shadow-md  shadow-zinc-700"
                >
                  <div className="aspect-square w-full overflow-hidden flex items-center justify-center rounded-lg">
                    <Image
                      src={post.mainImage}
                      width={1024}
                      height={1024}
                      alt={post.title}
                      className="w-full object-contain"
                    />
                  </div>
                  <span className="group-hover:bg-gray-200 duration-300 group-hover:p-4 absolute bottom-3 left-3 right-3 text-base lg:text-xl  drop-shadow-xl shadow-black mt-3 bg-white text-zinc-700 font-bold  text-left p-3 rounded-lg">
                    {post.title}
                  </span>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1d1d1d",
  publisher: "Black Bell Tattoo & Art",
  manifest: "/manifest.json",
  keywords: [
    "Blog o sztuce",
    "Sztuka",
    "Ciekawostki o sztuce",
    "Porady o sztuce",
    "Ciekawostki o stylu malowania",
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
  title: "BlackbellArt - Blog o sztuce | Świat sztuki",
  description:
    "Blog dotyczący sztuki. Czytaj o zagadnieniach związanych ze sztuką. Znajdź przydatne porady dotyczące sztuki.",
  openGraph: {
    type: "website",
    url: "https://blackbellart.com",
    title: "BlackbellArt - Blog o sztuce | Świat sztuki",
    description:
      "Blog dotyczący sztuki. Czytaj o zagadnieniach związanych ze sztuką. Znajdź przydatne porady dotyczące sztuki.",
    siteName: "Black Bell Tattoo & Art",
  },
};
