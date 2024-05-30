"use server";
export async function getShopProduct(category?: string, slug?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/shop?category=${
      category ? category : ""
    }&slug=${slug ? slug : ""}&secret=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 30 } }
  );
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}
