import { getUserCart } from '@/actions/cart.action';
import { getAllProducts } from '@/actions/products.action';
import ProductsGrid from '@/components/products-compo/ProductsGrid';
import React from 'react'

export default async function Products() {
    const {data:products} = await getAllProducts();
    await getUserCart();

  return (
    <div>
            <ProductsGrid products={products}/>
      
    </div>
  )
}
