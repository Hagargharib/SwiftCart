"use client"
import React from 'react'
import { ProductDetails } from '@/app/types/productDetails.model';
import { StarRating } from 'react-flexible-star-rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { addProductToCart } from '@/actions/cart.action';
import toast from 'react-hot-toast';
import { addToWishList, getUserWishList } from '@/actions/wishlist.action';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/app/context/wishlistContext';



export default function ProductDetailsCompo({ productDetails }: { productDetails: ProductDetails }) {
    const { wishlist, getWishlistDetails } = useWishlist();

    const { getCartDetails } = useCart();
    async function handleAddToCart(productId: string) {
        const response = await addProductToCart(productId);
        toast.success(response?.message)
        await getCartDetails();
    }

    async function handleAddToWishlist(productId: string) {
        const response = await addToWishList(productId);
        toast.success(response?.message)
        await getWishlistDetails();
    }
    const isInWishlist = wishlist?.some(item => item._id === productDetails._id);
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper rounded-lg shadow-md"
                >
                    {productDetails.images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-[500px] w-full">
                                <Image
                                    src={src}
                                    fill
                                    priority
                                    alt={productDetails.title}
                                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-green-900">
                        {productDetails.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Category: <span className="font-medium">{productDetails.category.name}</span>
                    </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                    {productDetails.description}
                </p>

                <div className="flex items-center justify-between border-t border-b py-4">
                    <span className="text-2xl font-semibold text-green-700">
                        ${productDetails.price}
                    </span>

                    <div className="flex items-center gap-2">
                        <StarRating
                            initialRating={Math.floor(productDetails.ratingsAverage)}
                            dimension={5}
                        />
                        <span className="text-sm text-gray-600">
                            {productDetails.ratingsAverage} / 5
                        </span>

                        <div className="flex items-center gap-2">
                            {isInWishlist ? (
                                <Heart
                                    onClick={() => handleAddToWishlist(productDetails._id)}
                                    className="cursor-pointer text-red-600"
                                    fill="red"
                                />
                            ) : (
                                <Heart
                                    onClick={() => handleAddToWishlist(productDetails._id)}
                                    className="cursor-pointer text-gray-400 hover:text-red-600"
                                />
                            )}
                        </div>
                    </div>
                </div>


                <button onClick={() => handleAddToCart(productDetails._id)} className="cursor-pointer w-full bg-green-600 hover:bg-green-700 transition-all rounded-lg py-3 text-lg font-medium text-white shadow-md">
                    + Add to Cart
                </button>


            </div>

        </div>

    )
}
