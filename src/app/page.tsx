import { getAllCategories } from "@/actions/categories.action";
import { getAllProducts } from "@/actions/products.action";
import ProductsGrid from "@/components/products-compo/ProductsGrid";
import CategSlider from "@/components/slider-compo/CategSlider";
import MainSlider from "@/components/slider-compo/MainSlider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(options);

  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();
  
  return (
    <>
      <MainSlider />
      <div>
        <CategSlider category={categories} />
      </div>
      <ProductsGrid products={products} />
    </>
  );
}
