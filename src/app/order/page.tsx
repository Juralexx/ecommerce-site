
import React from 'react'
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import OrderTemplate from "@/templates/order.template"
import { isAuthenticated } from '@/api/session';
import { getCarriers } from '@/api/carriers';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    return {
        title: 'Commande',
    };
}

export default async function OrderPage({ params, searchParams }: Props) {
    const user = await isAuthenticated();

    //Redirect to home page if the user param match nothing
    if (!user || Object.keys(user).length === 0) {
        redirect('/');
    };

    const { carriers } = await getCarriers({ published: true });

    return (
        <div className='container-xxl py-10'>
            <OrderTemplate
                user={user}
                carriers={carriers}
            />
        </div>
    )
}