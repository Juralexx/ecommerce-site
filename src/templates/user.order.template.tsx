"use client"

import React from 'react'
import Image from 'next/image';
import { Customer, Order } from '@/types'
import { dateParser, formatNumber, numericDateParser } from '@/functions/utils';
import { Divider, ImageBG } from '@/components/global';
import { getPaymentStatusColor, getStatusColor, getTranslatedPaymentStatus, getTranslatedStatus } from '@/functions/translation.utils';

interface Props {
    user: Customer.Options;
    order: Order.Options;
}

export default function UserOrder({ user, order }: Props) {
    return (
        <React.Fragment>
            <div className='relative w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                <h1 className='mb-2'>
                    Commande <span className='text-lg sm:block'>#{order._id}</span>
                </h1>
                <p className='mb-5'>{dateParser(order.date)}, {new Date(order.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="absolute right-3 top-5">
                    <p
                        className='py-2 px-4 rounded-md inline'
                        style={{ color: `rgb(${getPaymentStatusColor(order.payment_status)})`, backgroundColor: `rgba(${getPaymentStatusColor(order.payment_status)}, 0.2)` }}
                    >
                        {getTranslatedPaymentStatus(order.payment_status)}
                    </p>
                </div>
                <div className='absolute right-3 top-16'>
                    <p className='py-2 px-4 rounded-md inline'
                        style={{ color: `rgb(${getStatusColor(order.status)})`, backgroundColor: `rgba(${getStatusColor(order.status)}, 0.2)` }}
                    >
                        {getTranslatedStatus(order.status)}
                    </p>
                </div>
                <div className='flex items-center gap-x-9'>
                    <div>
                        <p className="label txt-sec">
                            Email
                        </p>
                        <p>{order.customer.email}</p>
                    </div>
                    <div>
                        <p className="label txt-sec">
                            Téléphone
                        </p>
                        <p>{order.customer?.phone || '-'}</p>
                    </div><div>
                        <p className="label txt-sec">
                            Paiement
                        </p>
                        <p>{order.payment_method}</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                <h2 className='mb-4'>Détails</h2>
                {order.products.map((element, i) => {
                    const { product, price, quantity } = element
                    return (
                        <div className='flex xs:flex-col items-center justify-between py-4' key={i}>
                            <div className='flex items-center xs:items-start mr-4 xs:mr-0 max-w-3/4 xs:w-full'>
                                <div className='min-w-[50px] h-[50px] mr-5 flex-shrink'>
                                    {product.images![0]?.path ? (
                                        <Image
                                            src={`${process.env.SERVER_URL}${product.images![0].path}`}
                                            height={60}
                                            width={60}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <ImageBG className="object-cover w-full h-full" />
                                    )}
                                </div>
                                <div className='inline-block'>
                                    <p className='max-w-[300px] xs:max-w-full xs:-mt-2'>
                                        <strong>{product.name}</strong>
                                        <br />
                                        Pot : {element.variant.size}L - Hauteur : {element.variant.height}cm
                                    </p>
                                    <p className='txt-sec'>Référence : {element.variant.ref}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between w-1/4 xs:w-1/2 xs:ml-auto xs:mt-2'>
                                <div className='txt-sec'>
                                    {price.toFixed(2)}€
                                </div>
                                <div className='txt-sec mx-2'>
                                    x{quantity}
                                </div>
                                <div className='inline-block'>
                                    {(quantity * price).toFixed(2)}€
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Divider />
                <div className='flex items-center justify-between pt-5 pb-2'>
                    <p className='bold'>Sous-total</p>
                    <p>{order.price}€</p>
                </div>
                <div className='flex items-center justify-between py-2'>
                    <p className='bold'>Frais de livraison</p>
                    <p>{order.shipping_fees.toString().padEnd(4, '0')}€</p>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <p className='bold'>Total</p>
                    <p className='text-3xl font-bold'>{formatNumber(order.price?.toFixed(2))}€</p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-1 gap-x-2 gap-y-2'>
                <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                    <h3>Adresse de livraison</h3>
                    <p className='font-semibold mb-3'>{order.delivery_address.name} {order.delivery_address.lastname}</p>
                    {order.delivery_address.society &&
                        <p>{order.delivery_address.society}</p>
                    }
                    <p>{order.delivery_address.street}</p>
                    {order.delivery_address.complement &&
                        <p>{order.delivery_address.complement}</p>
                    }
                    <p>{order.delivery_address.postcode} {order.delivery_address.city}</p>
                    <p>{order.delivery_address.phone}</p>
                </div>
                <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                    <h3>Adresse de facturation</h3>
                    <p className='font-semibold mb-3'>{order.billing_address.name} {order.billing_address.lastname}</p>
                    {order.billing_address.society &&
                        <p>{order.billing_address.society}</p>
                    }
                    <p>{order.billing_address.street}</p>
                    {order.billing_address.complement &&
                        <p>{order.billing_address.complement}</p>
                    }
                    <p>{order.billing_address.postcode} {order.billing_address.city}</p>
                    <p>{order.billing_address.phone}</p>
                </div>
            </div>
            <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                <h3>Transporteur</h3>
                <p><strong>Date </strong> : {numericDateParser(order.date)}</p>
                <p><strong>Transporteur  </strong> : {order.carrier.name}</p>
                <p><strong>Frais de port </strong> : {(order.shipping_fees).toString().padEnd(4, '0')}€</p>
                <p><strong>Numéro de suivi </strong> : -</p>
            </div>
            <div className='w-full p-7 bordered bg-white boxshadow-lg-colored rounded-xl overflow-hidden mb-4'>
                <h3 className='mb-0'>Timeline</h3>
                {order.timeline.map((item: any, i: number) => {
                    return (
                        <div className='av-timeline-item' key={i}>
                            {item.type === 'payment_status' &&
                                <>
                                    {item.status === 'awaiting' &&
                                        <div className='title'>
                                            Paiement en attente de validation
                                        </div>
                                    }
                                    {item.status === 'canceled' &&
                                        <div className='title'>
                                            Paiement annulé
                                        </div>
                                    }
                                    {item.status === 'paid' &&
                                        <div className='title'>
                                            Paiement accepté
                                        </div>
                                    }
                                    <div className='txt-sec'>
                                        {dateParser(item.date)}, {new Date(item.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </>
                            }
                            {item.type === 'order_status' &&
                                <>
                                    {item.status === 'accepted' &&
                                        <div className='title'>
                                            Commande acceptée
                                        </div>
                                    }
                                    {item.status === 'preparation' &&
                                        <div className='title'>
                                            Commande en préparation
                                        </div>
                                    }
                                    {item.status === 'completed' &&
                                        <div className='title'>
                                            Commande terminée
                                        </div>
                                    }
                                    {item.status === 'shipped' &&
                                        <div className='title'>
                                            Commande envoyée
                                        </div>
                                    }
                                    {item.status === 'canceled' &&
                                        <div className='title'>
                                            Commande annulée
                                        </div>
                                    }
                                    <div className='txt-sec'>
                                        {dateParser(item.date)}, {new Date(item.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    {item?.user &&
                                        <div className='mt-2'>
                                            {`Par ${item.user.name} ${item.user.lastname}`}
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}