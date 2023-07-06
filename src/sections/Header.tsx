"use client"

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Header({ images }: { images: string[] }) {
    return (
        <div className='relative w-screen h-[468px]'>
            <Swiper
                className='container-xxl mx-auto h-full'
                modules={[Navigation, Autoplay, Pagination]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
            >
                {images.map((img, key) => {
                    return (
                        <SwiperSlide className="carousel-slide" key={key}>
                            <Image
                                className='h-full w-full object-cover min-xl:mx-auto rounded-lg'
                                src={img}
                                alt=""
                                unoptimized={true}
                                priority
                                style={{ width: '100%' }}
                                width={0}
                                height={0}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}