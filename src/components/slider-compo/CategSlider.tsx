"use client";
import { Categories } from "@/app/types/category.model";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function CategSlider({ category }: { category: Categories[] }) {
    return (
        <div className="mt-8 mb-3">
            <h2 className="text-center text-[42px] text-green-900 font-medium pt-4 pb-12">
                Our Categories
            </h2>

            <Swiper
                slidesPerView={5}
                spaceBetween={3}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                {category.map((cat) => (
                    <SwiperSlide key={cat._id}>
                        <div className="relative h-[250px] w-full">
                            <Image
                                src={cat.image}
                                fill
                                priority
                                loading="eager"
                                alt={cat.name}
                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                        <p className="py-2 text-center text-2xl font-semibold text-green-900">
                            {cat.name}
                        </p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
