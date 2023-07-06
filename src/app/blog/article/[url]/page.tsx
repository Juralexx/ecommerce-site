import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { getPageByURL, getPages } from '@/api/pages';
import { Page } from "@/types";
import PageTemplate from '@/templates/page.template';

interface Props {
    params: { url: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { url } = params;
    //Fetch single blog article
    const { page } = await getPageByURL(url);

    return {
        title: page.title + ' - Blog' || 'Article - Blog'
    };
}

export default async function BlogArticle({ params, searchParams }: Props) {
    const { url } = params;
    //Fetch blog pages
    const { page } = await getPageByURL(url);

    if (!page || Object.keys(page).length === 0) {
        redirect('/');
    };

    //Retrieve current page category name
    const { category: { name } } = page;
    //Fetch others articles from the same category to display 'related articles'
    const { pages: relatedPages } = await getPages({ ...searchParams, category: name, limit: 3 });
    //Fetch the last added articles to display 'last articles'
    const { pages: lastPages } = await getPages({ ...searchParams, sort: 'updatedAt', limit: 4 });

    return (
        <PageTemplate
            page={page as Page.Options}
            relatedPages={relatedPages}
            lastPages={lastPages}
        />
    )
}