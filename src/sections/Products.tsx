"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Product } from "@/types";
import { Card, CardContent, IconButton, CardHeader, ImageBG } from '../components/global';
import Icon from '@/components/global/icons/Icon';
import SwiperType from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

function getPromotion(price: number, promotion: number) {
    return (price - ((promotion / 100) * price)).toFixed(2)
}

interface Props {
    title: string;
    products: Product.Options[];
}

const Products = ({ title, products }: Props) => {
    const swiperRef = React.useRef<SwiperType>()

    return (
        <div className='container-xxl min-xl:px-0'>
            <div className='flex justify-between items-center'>
                <h2 className='m-0'>{title}</h2>
                <div className="swiper__buttons">
                    <IconButton className='v-default' onClick={() => swiperRef.current?.slidePrev()}>
                        <Icon name="ArrowLeft" />
                    </IconButton>
                    <IconButton className="v-default ml-2" onClick={() => swiperRef.current?.slideNext()}>
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
                {products.length > 0 &&
                    products.map((product: Product.Options, i: number) => {
                        const { name, category, images, base_variant } = product
                        return (
                            <SwiperSlide className="max-w-sm !h-auto" key={i}>
                                <Link href={`/product/${base_variant.url}`}>
                                    <Card key={i} className='!h-full'>
                                        {product.images!.length > 0 ? (
                                            <Image
                                                className="card-top-img"
                                                src={`${process.env.SERVER_URL}${images![0].path}`}
                                                height={140}
                                                width={300}
                                                style={{ height: 200, width: "100%", objectFit: 'cover' }}
                                                alt={name}
                                                title={name}
                                            />
                                        ) : (
                                            <ImageBG>
                                                <Icon name="Picture" />
                                            </ImageBG>
                                        )}
                                        <CardHeader
                                            title={name}
                                            uptitle={category.name}
                                        />
                                        <CardContent>
                                            <p className='text-right'>
                                                À partir de {base_variant?.promotion > 0 ? (
                                                    <>
                                                        <span className='text-2xl font-semibold ml-1'>{getPromotion(base_variant.price, base_variant.promotion)}</span>€
                                                        <span className='has-discount ml-2'>{base_variant.price.toFixed(2)}€</span>
                                                    </>
                                                ) : (
                                                    <span className='text-2xl font-semibold ml-1'>
                                                        {base_variant.price.toFixed(2)}€
                                                    </span>
                                                )}
                                            </p>
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

export default Products