"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categoriesArrs = [
    [
        { name: 'Orange', link: '/category/orangers', image: '/categories/orangers.jpg' },
        { name: 'Citron', link: '/category/citronniers', image: '/categories/citronniers.jpg' },
        { name: 'Lime', link: '/category/limettiers', image: '/categories/limettiers.jpg' },
        { name: 'Pamplemousse', link: '/category/pamplemoussiers', image: '/categories/pamplemoussiers.jpg' }
    ], [
        { name: 'Olivier', link: '/category/oliviers', image: '/categories/oliviers.jpg' },
        { name: 'Orange sanguine', link: '/category/orangers-sanguins', image: '/categories/orangers-sanguins.jpg' },
        { name: 'Palmier', link: '/category/palmiers', image: '/categories/palmiers.jpg' },
        { name: 'Kumquat', link: '/category/kumquatiers', image: '/categories/kumquatiers.jpg' },
    ]
]

export default function MainCategories() {
    return (
        <div className='container-xxl min-xl:px-0'>
            <h2>À découvrir</h2>
            <div className='grid grid-cols-1 gap-4'>
                {categoriesArrs.map((categories, i) => {
                    return (
                        <div className={`grid sm:grid-cols-1 lg:grid-cols-${categories.length / 2} grid-cols-${categories.length} gap-4`} key={i}>
                            {categories.map((category, j) => {
                                return (
                                    <Link href={category.link} key={j} className='relative'>
                                        <Image
                                            src={category.image}
                                            height={140}
                                            width={300}
                                            style={{ height: 'auto', width: "100%", borderRadius: 8 }}
                                            alt={category.name}
                                        />
                                        <p className='text-2xl font-semibold absolute bottom-4 right-5 text-right'>
                                            {category.name}
                                        </p>
                                    </Link>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}