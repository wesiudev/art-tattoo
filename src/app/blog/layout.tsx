import Link from "next/link";
import TopBar from "../shop/components/ShopHeader/TopBar";
import Orders from "../shop/components/Orders";
import ShopFooter from "../shop/components/ShopFooter";
import PrepareCart from "../shop/components/PrepareCart";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white overflow-hidden">
      {" "}
      <PrepareCart />
      <TopBar />
      {children}
      <Orders />
      <ShopFooter />
    </div>
  );
}
