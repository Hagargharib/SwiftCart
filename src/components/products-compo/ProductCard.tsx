"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Products } from "@/app/types/product.model";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";
import { addProductToCart } from "@/actions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistContext";

export default function ProductCard({ product }: { product: Products }) {
    const { getCartDetails } = useCart();
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlist();

    const inWishlist = isInWishlist(product._id);

    async function handleAddToCart(productId: string) {
        try {
            const response = await addProductToCart(productId);
            toast.success(response?.message);
            await getCartDetails();
        } catch (err) {
            toast.error("Failed to add to cart");
        }
    }

    async function toggleWishlist(productId: string) {
        if (inWishlist) {
            await removeWishlistItem(productId);
        } else {
            await addWishlistItem(productId);
        }
    }

    return (
        <div>
            <Card className="relative group overflow-hidden">
                <div className="z-1 flex flex-col gap-2 transition-all duration-700 absolute right-[-100px] top-[130px] group-hover:right-0 ">
                    {/* Add to Cart */}
                    <button
                        onClick={() => handleAddToCart(product._id)}
                        className="px-2 py-2 cursor-pointer text-white bg-green-700"
                    >
                        <ShoppingCart />
                    </button>

                    {/* Wishlist toggle */}
                    <button
                        onClick={() => toggleWishlist(product._id)}
                        className="px-2 py-2 cursor-pointer flex items-center justify-center  bg-green-700"
                    >
                        <Heart
                            className={`w-6 h-6 transition-colors ${inWishlist ? "text-red-600 fill-red-600" : "text-white"
                                }`}
                        />
                    </button>

                    {/* View product */}
                    <Link
                        href={`/products/${product._id}`}
                        className="px-2 py-2 cursor-pointer text-white bg-green-700 flex items-center justify-center"
                    >
                        <ZoomIn />
                    </Link>
                </div>

                {/* Header */}
                <CardHeader>
                    <CardTitle className="text-green-900 font-bold text-xl">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                    </CardTitle>
                    <CardDescription>
                        {product.description.split("").slice(0, 25).join("")}...
                    </CardDescription>
                </CardHeader>

                {/* Image */}
                <CardContent>
                    <div className="relative w-full h-[200px]">
                        <Image
                            alt={product.title}
                            src={product.imageCover}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                        />
                    </div>
                </CardContent>

                {/* Footer */}
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        {/* Price */}
                        <span className="text-lg font-semibold text-green-700">
                            ${product.price}
                        </span>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <StarRating
                                initialRating={Math.floor(product.ratingsAverage)}
                                dimension={5}
                            />
                            <span className="text-sm text-green-700">
                                {product.ratingsAverage}
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
