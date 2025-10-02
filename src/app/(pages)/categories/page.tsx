import { getAllCategories } from "@/actions/categories.action";
import CategoriesGrid from "@/components/categories-compo/CategoriesGrid";


export default async function CategoriesPage() {
  // const { data: categories } = await getAllCategories();
  const result = await getAllCategories();
  const categories = result?.data ?? [];


  return (
    <>
      <div>
        <CategoriesGrid categories={categories} />
      </div>

    </>

  );
}
