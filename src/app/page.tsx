import { getAllCategories } from "@/actions/categories.action";
import { getAllProducts } from "@/actions/products.action";
import ProductsGrid from "@/components/products-compo/ProductsGrid";
import CategSlider from "@/components/slider-compo/CategSlider";
import MainSlider from "@/components/slider-compo/MainSlider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(options);

  const response = await getAllCategories();
  const data = response?.data;
  const {data:products} = await getAllProducts();
  
  
  return (
    <>
      <MainSlider />
      <div >
        <CategSlider category={data} />
      </div>
      <ProductsGrid products={products}/>
    </>
  );
}
