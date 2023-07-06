"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Category } from "@/types";
import { Button, Card, CardContent, IconButton, ImageBG } from '../components/global';
import Icon from '@/components/global/icons/Icon';
import SwiperType from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { randomItem } from '@/functions/utils';

const Categories = ({ categories }: { categories: Category.Options[] }) => {
    const swiperRef = React.useRef<SwiperType>()

    return (
        <div className='container-xxl min-xl:px-0'>
            <div className='flex justify-between items-center'>
                <h2 className="m-0">Nos catégories</h2>
                <div className="swiper__buttons">
                    <IconButton className='v-default' onClick={() => swiperRef.current?.slidePrev()}>
                        <Icon name="ArrowLeft" />
                    </IconButton>
                    <IconButton className='v-default ml-2' onClick={() => swiperRef.current?.slideNext()}>
                        <Icon name="ArrowRight" />
                    </IconButton>
                </div>
            </div>
            <Swiper
                className='carousel container-xxl !py-7'
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
                onBeforeInit={swiper => swiperRef.current = swiper}
                slidesPerView="auto"
                spaceBetween={20}
            >
                {categories.map((category: Category.Options, i: number) => {
                    return (
                        <SwiperSlide className="max-w-sm" key={i}>
                            <Link href={category.link}>
                                <Card>
                                    {category?.image ? (
                                        <Image
                                            className="card-top-img"
                                            src={`${process.env.SERVER_URL}${category.image.path}`}
                                            height={140}
                                            width={300}
                                            style={{ height: 200, width: "100%", objectFit: 'cover' }}
                                            alt={category.name}
                                        />
                                    ) : (
                                        <ImageBG>
                                            <Icon name="Picture" />
                                        </ImageBG>
                                    )}
                                    <CardContent>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-xl font-semibold text-center'>{category.name}</p>
                                            <Icon name="ArrowRight" className="primary" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Categories;