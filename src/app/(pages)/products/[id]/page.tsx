import { getProductsDetails } from '@/actions/products.action';
import ProductDetailsCompo from '@/components/products-compo/ProductDetailsCompo';
import React from 'react'

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getProductsDetails(id);

  if (!response?.data) {
    return <div>Product not found</div>;
  }

  const productDetails = response.data;


  return (
    <div className='container mx-auto' >
      <ProductDetailsCompo productDetails={productDetails} />
    </div>
  )
}

