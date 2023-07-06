
import React from 'react'
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { isAuthenticated } from '@/api/session';
import axios from '@/axios.config'
import OrderSuccess from '@/templates/order.success.template';
import { Order } from '@/types';
import { getOrder } from '@/api/orders';

interface Props {
    params: { category: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    return {
        title: 'Commande validée',
    };
}

export default async function OrderPage({ params, searchParams }: Props) {
    const user = await isAuthenticated();

    //Redirect to home page if the user param match nothing
    if (!user || Object.keys(user).length === 0) {
        redirect('/');
    };

    const { session_id } = searchParams;

    const response = await axios
        .get('/api/payment/order/success', { params: { session_id: session_id } })
        .then(res => res.data)
        .catch(err => console.log(err))

    const { session: { metadata: { orderId } } } = response;

    //Fetch requested order
    const { order } = await getOrder(orderId);
    //Redirect to user orders page if the order ID param match nothing
    if (!order || Object.keys(order).length === 0) {
        redirect(`/user/orders/${orderId}`);
    };

    //If the order customer is not fetched or has no ID
    //or the order customer ID is not the user customer ID (so it's not an order of the current customer)
    if (order && user) {
        if (!order.customer || !order.customer._id || (order.customer._id !== user._id)) {
            redirect(`/user/orders/${orderId}`);
        }
    }

    return (
        <div className='container-xxl py-10'>
            <OrderSuccess user={user} order={order as Order.Options} />
        </div>
    )
}