"use client"

import React from 'react'
import Link from 'next/link';
import { Promotion } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerTop = ({ promotions }: { promotions: Promotion.Options[] }) => {
    return (
        <div className='fixed top-0 flex justify-center items-center w-full h-[40px] font-semibold z-[1001] whitespace-nowrap cursor-pointer'>
            <Swiper
                className='h-full w-full'
                modules={[Autoplay]}
                autoplay={{ delay: 5000 }}
                slidesPerView={1}
                loop={true}
            // allowTouchMove={false}
            >
                {promotions.map((promotion, key) => {
                    return (
                        <SwiperSlide
                            key={key}
                            style={{
                                background: [
                                    'linear-gradient(45deg, var(--primary), var(--primary-light))',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ][key]
                            }}>
                            <Link href={`/promotions/${promotion._id}`}>
                                <div className="flex items-center min-xs:justify-center w-auto py-2 !px-4 whitespace-nowrap overflow-x-auto overflow-y-hidden h-full">
                                    <div className='inline-block code-promo !bg-white'>
                                        -{promotion.value}{promotion.type === 'percentage' ? '%' : '€'}
                                    </div>
                                    <div className='inline-block text-lg white mt-1 mx-3'>
                                        {promotion.description}
                                    </div>
                                    <div className='inline-block code-promo !bg-white'>
                                        <span>CODE</span> {promotion.code}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default BannerTop;