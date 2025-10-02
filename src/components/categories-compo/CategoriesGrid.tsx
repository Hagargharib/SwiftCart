"use client";

import { getAllSubCategories } from "@/actions/subCategories.action";
import { Categories } from "@/app/types/category.model";
import Image from "next/image";
import { useState } from "react";

interface Subcategory {
    _id: string;
    name: string;
}

export default function CategoriesGrid({ categories }: { categories: Categories[] }) {
    const [activeCat, setActiveCat] = useState<string | null>(null);
    const [subcats, setSubcats] = useState<Record<string, Subcategory[]>>({});
    const [loading, setLoading] = useState(false);

    async function handleCategoryClick(catId: string) {
        if (activeCat === catId) {
            setActiveCat(null); // close if clicked again
            return;
        }

        setActiveCat(catId);

        if (!subcats[catId]) {
            setLoading(true);
            const res = await getAllSubCategories(catId);
            setSubcats((prev) => ({ ...prev, [catId]: res?.data || [] }));
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-center text-[42px] text-green-900 font-medium mb-12">
                Our Categories
            </h1>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        onClick={() => handleCategoryClick(cat._id)}
                        className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="relative h-[250px] w-full">
                            <Image
                                src={cat.image}
                                fill
                                alt={cat.name}
                                className="object-cover"
                                priority
                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                            />
                        </div>
                        <p className="py-4 text-center text-2xl font-semibold text-green-900">
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>

            {/* Subcategories Section */}
            {activeCat && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-green-800 text-center mb-6">
                        Subcategories of{" "}
                        {categories.find((c) => c._id === activeCat)?.name}
                    </h2>

                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {subcats[activeCat]?.map((sub) => (
                                <div
                                    key={sub._id}
                                    className="p-4 border rounded-lg text-center bg-white shadow hover:shadow-md transition"
                                >
                                    {sub.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
