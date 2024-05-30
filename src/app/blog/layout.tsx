import TopBar from "../(home)/components/ShopHero/TopBar";
import Orders from "../(home)/components/Orders";
import ShopFooter from "../(home)/components/ShopFooter";
import PrepareCart from "../(home)/components/PrepareCart";

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
      <div className="mt-12">
        <Orders />
      </div>
      <ShopFooter />
    </div>
  );
}
