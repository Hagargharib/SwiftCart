"use client";
import React, { useState } from "react";
import { Products } from "@/app/types/product.model";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products }: { products: Products[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    // filter products by title or description
    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto mt-8">
            {/* Title */}
            <h2 className="text-[42px] text-center font-medium text-green-900 pt-4 pb-6">
                Our Products
            </h2>

            {/* Search Input */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-green-600"
                />
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No products found.</p>
            )}
        </div>
    );
}
