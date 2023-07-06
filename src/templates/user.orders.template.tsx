"use client"

import React from 'react'
import { Customer } from '@/types'
import { Button } from '@/components/global';
import { formatNumber, numericDateParser, sortByDate } from '@/functions/utils';
import { getStatusColor, getTranslatedStatus } from '@/functions/translation.utils';

interface Props {
    user: Customer.Options;
}

export default function UserOrders({ user }: Props) {
    return (
        <React.Fragment>
            <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden'>
                <div className='text-xl font-semibold mb-4'>
                    Mes commandes
                </div>
                {user.orders.length === 0 ? (
                    <>
                        <p className='mb-6'>
                            Vous trouverez ici vos l'historique de vos commandes. <br />
                            Vous n'avez pas encore passé de commande.
                        </p>
                        <div className='flex flex-col items-center gap-y-6 justify-center mt-3'>
                            <img
                                src={`/img/empty-cart.png`}
                                style={{ height: 'auto', width: 250, objectFit: 'cover', borderRadius: 8 }}
                                alt={'Panier vide'}
                            />
                            <Button href="/" className='v-primary is-link'>
                                Découvrir nos produits
                            </Button>
                        </div>
                    </>

                ) : (
                    <div className='flex flex-col gap-y-3 mb-6'>
                        <p className='mb-6'>
                            Voici les commandes que vous avez passées depuis la création de votre compte.
                        </p>
                        <div className='av-table-container'>
                            <div className='av-table'>
                                <div className='av-table-head'>
                                    <div className='av-table-head-row'>
                                        {['Référence', 'Date', 'Prix', 'Paiement', 'Status', '']
                                            .map((title, i) => {
                                                return (
                                                    <div className='av-table-cell' key={i}>
                                                        {title}
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                                <div className='table-row-group'>
                                    {sortByDate(user.orders, 'asc', 'date')
                                        .map((order, i) => {
                                            return (
                                                <div className='table-row align-middle outline-0 bordered' key={i}>
                                                    <div className='av-table-cell'>
                                                        #{order._id}
                                                    </div>
                                                    <div className='av-table-cell'>
                                                        {numericDateParser(order.date)} {new Date(order.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                    <div className='av-table-cell text-right pr-12'>
                                                        {formatNumber(order.price.toFixed(2))}€
                                                    </div>
                                                    <div className='av-table-cell'>
                                                        {order.payment_method}
                                                    </div>
                                                    <div className='av-table-cell'>
                                                        <p
                                                            className='py-2 px-4 rounded-md !inline'
                                                            style={{ color: `rgb(${getStatusColor(order.status)})`, backgroundColor: `rgba(${getStatusColor(order.status)}, 0.2)` }}
                                                        >
                                                            {getTranslatedStatus(order.status)}
                                                        </p>
                                                    </div>
                                                    <div className='av-table-cell'>
                                                        <Button href={`/user/orders/${order._id}`} className='v-primary fullwidth is-link'>
                                                            Voir
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}