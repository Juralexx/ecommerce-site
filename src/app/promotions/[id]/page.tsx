import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { getProducts } from '@/api/products';
import ListingTemplate from '@/templates/listing.template';
import { getPromotion } from '@/api/promotions';

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    //Read route params
    const { id } = params;
    //Find and fetch the requested promotion
    const { promotion } = await getPromotion(id);

    return {
        title: `-${promotion.value}${promotion.type === 'percentage' ? '%' : '€'} ${promotion.code} - Promotion`,
    };
}

/**
 * Check if a promotion is active
 * @param start Date start
 * @param end Date end
 */

function isPromotionActive(start: string | Date, end: string | Date): boolean {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    if (now < startDate)
        return false;
    else if (endDate && now > endDate)
        return false;
    else if (now > startDate && (endDate && now < endDate))
        return true;
    else if (now > startDate && !endDate)
        return true;
    else return false
}

export default async function PromotionProductsListing({ params, searchParams }: Props) {
    //Get category param from URL
    const { id } = params;
    //Find and fetch the requested category
    const { promotion } = await getPromotion(id);
    //Check if a promotion is active
    const isActive: boolean = isPromotionActive(promotion.start_date, promotion.end_date);

    //Redirect to home page if the category param match nothing
    if (!promotion || !isActive || Object.keys(promotion).length === 0) {
        redirect('/');
    };

    //Assign promotion ID if a promotion is fetched
    //Assign the 'all' value if the promotion is applied on all the products
    const promotionId = promotion.condition.type !== 'all' ? promotion._id : 'all';
    //Fetch products from the current category route
    const { products, count, currentPage, limit } = await getProducts({ ...searchParams, promotion: promotionId });

    return (
        <div className='container-xxl py-10'>
            <ListingTemplate
                title={`-${promotion.value}${promotion.type === 'percentage' ? '%' : '€'} ${promotion.code} ${promotion.description}`}
                count={count}
                currentPage={currentPage}
                limit={limit}
                searchParams={searchParams}
                products={products}
            />
        </div>
    )
}