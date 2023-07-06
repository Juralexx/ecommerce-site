import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { getCategories } from '@/api/categories';
import { getProducts } from '@/api/products';
import ListingTemplate from '@/templates/listing.template';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    //Read route params
    const { category } = params;
    //Find and fetch the requested category
    const { categories } = await getCategories({ q: category, fields: 'link' });

    return {
        title: categories[0]?.name,
    };
}

export default async function CategoryProductsListing({ params, searchParams }: Props) {
    //Get category param from URL
    const { category } = params;
    //Find and fetch the requested category
    const { categories } = await getCategories({ q: category, fields: 'link' });

    //Redirect to home page if the category param match nothing
    if (!categories || categories.length === 0) {
        redirect('/');
    };

    //Assign category ID if a category if fetched
    const categoryId = categories[0]._id;
    //Fetch products from the current category route
    const { products, count, currentPage, limit } = await getProducts({ ...searchParams, categoryId: categoryId });

    return (
        <div className='container-xxl py-10'>
            <ListingTemplate
                title={categories[0].name}
                description={categories[0].content}
                count={count}
                currentPage={currentPage}
                limit={limit}
                searchParams={searchParams}
                products={products}
            />
        </div>
    )
}