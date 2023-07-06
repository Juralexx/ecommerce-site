import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { getPages } from '@/api/pages';
import BlogCategoryTemplate from '@/templates/blog.category.template';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { category } = params;
    //Fetch blog pages
    const { pages: categories } = await getPages({ sorted: true, only_categories: true });
    //Get category name based on the current slug
    const { name } = categories.find(cat => cat.url === category);

    return {
        title: name + ' - Blog'
    };
}

export default async function BlogCategoryListing({ params, searchParams }: Props) {
    const { category } = params;
    //Fetch blog pages
    const { pages } = await getPages({ category: category });

    if (!pages || pages.length === 0) {
        redirect('/');
    };

    return (
        <div className='container-xxl py-10'>
            <BlogCategoryTemplate
                category={pages[0].category}
                pages={pages}
            />
        </div>
    )
}