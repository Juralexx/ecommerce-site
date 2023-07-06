import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import CartTemplate from '@/templates/cart.template';

interface Props {
    params: { product: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    return {
        title: 'Panier',
    };
};

export default async function CartPage({ params, searchParams }: Props) {
    return (
        <div className='container-xxl py-10'>
            <CartTemplate />
        </div>
    );
};