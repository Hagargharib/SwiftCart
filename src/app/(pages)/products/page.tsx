import { getUserCart } from '@/actions/cart.action';
import { getAllProducts } from '@/actions/products.action';
import ProductsGrid from '@/components/products-compo/ProductsGrid';
import React from 'react'

export default async function Products() {
    const response = await getAllProducts();
    await getUserCart();

    if (!response?.data) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">No products found</h2>
                    <p className="text-gray-600 mt-2">Please check back later.</p>
                </div>
            </div>
        );
    }

    const products = response.data;

    return (
        <div>
            <ProductsGrid products={products}/>
        </div>
    );
}