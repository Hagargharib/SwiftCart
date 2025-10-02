import { getAllCategories } from "@/actions/categories.action";
import CategoriesGrid from "@/components/categories-compo/CategoriesGrid";


export default async function CategoriesPage() {
  const { data: categories } = await getAllCategories();

  return (
    <>
      <div>
        <CategoriesGrid categories={categories} />
      </div>

    </>

  );
}
