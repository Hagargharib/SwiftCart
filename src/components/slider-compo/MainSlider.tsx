"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function MainSlider() {
    return (
        <div className="mx-auto relative w-full h-[400px]">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image
                    src="/slider/slider1.jpg"
                    alt="slider background"
                    fill
                    className="object-cover"
                    priority
                    loading='eager'
                />
            </div>

            <Swiper
                speed={600}
                parallax={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="mySwiper w-full h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="flex items-center justify-start h-full px-10">
                        <div className="text-left" data-swiper-parallax="-200">
                            <h2 className="text-green-900 text-3xl font-bold">
                                SUMMER SALE!
                            </h2>
                            <p
                                className="text-md text-green-900 mt-2 font-semibold"
                                data-swiper-parallax="-100"
                            >
                                You can find all your favorite products here.
                            </p>
                            <Link href="/products">
                            <Button variant="outline" className="mt-4 text-green-900 cursor-pointer">
                                SHOP NOW
                            </Button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="flex items-center justify-start h-full px-10">
                        <div className="text-left" data-swiper-parallax="-200">
                            <h2 className="text-green-900 text-3xl font-bold">
                                DONOT MISS THE OFFER!
                            </h2>
                            <Button variant="outline" className="mt-4 text-green-900">
                                SHOP NOW
                            </Button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
