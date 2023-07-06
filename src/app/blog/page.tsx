import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { getPages } from '@/api/pages';
import BlogTemplate from '@/templates/blog.template';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    return {
        title: 'Blog'
    };
}

export default async function BlogListing({ params, searchParams }: Props) {
    //Fetch blog pages
    const { pages } = await getPages({ ...searchParams, sorted: true });

    return (
        <div className='container-xxl py-10'>
            <BlogTemplate
                blog={pages}
            />
        </div>
    )
}