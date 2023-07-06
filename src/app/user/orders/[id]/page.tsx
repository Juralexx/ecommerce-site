import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/api/session';
import { getOrder } from '@/api/orders';
import UserTemplate from '@/templates/user.template';
import UserOrder from '@/templates/user.order.template';
import { Order } from '@/types';

interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const user = await isAuthenticated();

    return {
        title: (user && user.name && user.lastname) ? `${user.name} ${user.lastname} - Profil` : 'Profil'
    };
};

export default async function UserOrderPage({ params, searchParams }: Props) {
    const user = await isAuthenticated();

    //Redirect to home page if the user param match nothing
    if (!user || Object.keys(user).length === 0) {
        redirect('/');
    };

    //Get the order ID param
    const { id } = params;
    //Fetch requested order
    const { order } = await getOrder(id);
    //Redirect to user orders page if the order ID param match nothing
    if (!order || Object.keys(order).length === 0) {
        redirect('/user/orders');
    };
    
    //If the order customer is not fetched or has no ID
    //or the order customer ID is not the user customer ID (so it's not an order of the current customer)
    if (order && user) {
        if (!order.customer || !order.customer._id || (order.customer._id !== user._id)) {
            redirect('/user/orders');
        }
    }

    return (
        <>
            <div className="relative w-full h-60">
                <div className="w-full h-full bg-primary" />
            </div>
            <div className='container-xxl pt-10 pb-20 -mt-48'>
                <UserTemplate user={user}>
                    <UserOrder user={user} order={order as Order.Options} />
                </UserTemplate>
            </div>
        </>
    )
}