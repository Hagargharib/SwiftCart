"use client";
import { Brand } from "@/app/types/productDetails.model";
import Image from "next/image";

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-center text-[42px] text-green-900 font-medium mb-12">
                Our Brands
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {brands.map((brand) => (
                    <div
                        key={brand._id}
                        className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                        <div className="relative h-[180px] w-full">
                            <Image src={brand.image} priority fill alt={brand.name} className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw" />
                        </div>
                        <p className="py-4 text-center text-2xl font-semibold text-green-900">
                            {brand.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
