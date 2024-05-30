import { getShopProduct } from "@/lib/getShopProduct";

import React from "react";
import Products from "./components/Products";
import Orders from "./components/Orders";
import ShopFooter from "./components/ShopFooter";
import PrepareCart from "./components/PrepareCart";
import ShopHero from "./components/ShopHero";

export default async function Shop() {
  const products = await getShopProduct();

  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <ShopHero />
      <Products products={products} />
      <div className="mt-12">
        <Orders />
      </div>
      <ShopFooter />
    </div>
  );
}
