import { getAllBrands } from '@/actions/brands.action';
import BrandsGrid from '@/components/brands-compo/BrandsGrid';
import React from 'react'


  export default async function BrandsPage() {
  const result = await getAllBrands();
  const brands = result?.data ?? [];

  return (
    <div>
      <BrandsGrid brands={brands} />
    </div>
  );
}



