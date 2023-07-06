import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { getProductByURL, getProducts } from '@/api/products';
import { IProductVariant, Product } from '@/types';
import ProductTemplate from '@/templates/product.template';

interface Props {
    params: { product: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    //Read route params
    const { product: variantURL } = params;
    const { product } = await getProductByURL(variantURL);

    return {
        title: product.name,
    };
}

export default async function ProductPage({ params, searchParams }: Props) {
    //Get current product variant param from URL
    const { product: variantURL } = params;
    //Find and fetch the requested product variant
    const { product, current_variant } = await getProductByURL(variantURL);

    //Redirect to home page if the variant url param match nothing
    if (!product || Object.keys(product).length === 0 || !product.published) {
        redirect('/');
    };

    //Get similar products from the same product category to display them at the bottom of the page
    const { products: similarProducts } = await getProducts({ categoryId: product.category._id });

    return (
        <div className='container-xxl py-10'>
            <ProductTemplate
                product={product as Product.Options}
                current_variant={current_variant as IProductVariant}
                similarProducts={similarProducts}
            />
        </div>
    )
}