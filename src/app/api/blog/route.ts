import { NextResponse, NextRequest } from "next/server";
import { getBlogPosts } from "@/firebase";
import { Post } from "@/types";
export const revalidate = 30;
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const url = req.nextUrl.searchParams.get("url");
  const blogType = req.nextUrl.searchParams.get("blogType");

  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  const posts = await getBlogPosts();
  if (url) {
    const post = posts?.posts.find(
      (post: Post) => url === post.url && blogType === post.blogType
    );

    return NextResponse.json({
      post,
    });
  }
  if (!url) {
    return NextResponse.json({
      posts,
    });
  }
}
