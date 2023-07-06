import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { getProducts } from '@/api/products';
import ListingTemplate from '@/templates/listing.template';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    //Read route params
    const { q } = searchParams;
    const title = q ? `${String(q)} - Recherche` : 'Résultats de votre recherche'

    return {
        title: title
    };
}

export default async function SearchProductsListing({ params, searchParams }: Props) {
    //Get query param from URL
    const { q } = searchParams;
    //Find and fetch the requested products
    const { products, count, currentPage, limit } = await getProducts({ ...searchParams, q: q });

    return (
        <div className='container-xxl py-10'>
            <ListingTemplate
                title={q ? `Resultats pour "${q}"` : 'Résultats de votre recherche'}
                count={count}
                currentPage={currentPage}
                limit={limit}
                searchParams={searchParams}
                products={products}
            />
        </div>
    )
}