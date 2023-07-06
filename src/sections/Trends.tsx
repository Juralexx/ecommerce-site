"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Product } from "@/types";
import { Card, CardContent, CardHeader, ImageBG } from '../components/global';
import Icon from '@/components/global/icons/Icon'

function getPromotion(price: number, promotion: number) {
    return (price - ((promotion / 100) * price)).toFixed(2)
}

const Trends = ({ mostSoldProducts }: { mostSoldProducts: Product.Options[] }) => {
    return (
        <div className='container-xxl min-xl:px-0'>
            <h2>Tendances du moment</h2>
            <div className='grid grid-cols-1 min-xs:grid-cols-2 min-sm:grid-cols-3 min-md:grid-cols-4 gap-3'>
                {mostSoldProducts.length > 0 &&
                    mostSoldProducts.map((product: Product.Options, i: number) => {
                        const { name, category, images, base_variant } = product
                        return (
                            <Link href={`/product/${base_variant.url}`} key={i}>
                                <Card className='!h-full'>
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
                                                <>
                                                    <span className='text-2xl font-semibold ml-1'>
                                                        {base_variant.price.toFixed(2)}
                                                    </span>€
                                                </>
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}

export default Trends