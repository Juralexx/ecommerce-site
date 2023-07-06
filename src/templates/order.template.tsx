"use client"

import React from 'react'
import Link from 'next/link'
import useCart from '@/functions/useCart'
import { CartContext } from '@/contexts/CartContext'
import { Breadcrumb, Button, Input } from '@/components/global'
import Icon from '@/components/global/icons/Icon'
import { Address, Carrier, Customer } from '@/types'
import OrderAddressTemplate from './order.address.template'
import OrderDeliveryTemplate from './order.delivery.template'
import { formatNumber, getTotal } from '@/functions/utils'
import axios from 'axios'
import useAlert from '@/contexts/alert/useAlert'

interface Props {
    user: Customer.Options;
    carriers: Carrier.Options[];
}

export default function OrderTemplate({ user, carriers }: Props) {
    const cartStorage = localStorage.getItem('cart_id');
    if (!cartStorage) {
        window.location.pathname = '/cart'
    }

    //Promotion code input value
    const [codeInput, setCodeInput] = React.useState<string>('');
    //Order steps : cart, addresses, delivery, payment
    const [steps, setSteps] = React.useState<{ current: string, validated: string[] }>({
        current: 'addresses',
        validated: ['cart']
    });
    //Addresses object containg delivery address and billing address
    const [addresses, setAddresses] = React.useState({
        delivery_address: user.addresses.length > 0 ? user.addresses[0] : null,
        billing_address: user.addresses.length > 0 ? user.addresses[0] : null,
    })
    //Order carrier
    const [carrier, setCarrier] = React.useState(carriers[0]! || null)
    //User cart
    const { cart, setCart, codePromo, setCodePromo } = React.useContext(CartContext);

    if (cart.length <= 0) {
        window.location.pathname = '/cart'
    }

    const {
        total,
        getCartTotal,
        handleCodePromo,
        applicableCodes
    } = useCart({ cart, setCart, codePromo, setCodePromo });

    const { setAlert } = useAlert();

    /**
    * Launch the stripe payment session
    */

    async function handleStripeCheckout() {
        //Get the user cart ID in the localStorage
        const cartId = localStorage.getItem('cart_id');
        //Request for the stripe session
        await axios({
            method: 'post',
            url: '/api/payment/create-checkout-session',
            data: {
                checkout: {
                    cart: cart,
                    cartId: cartId,
                    carrier: carrier,
                    codePromo: codePromo,
                    delivery_address: addresses.delivery_address,
                    billing_address: addresses.billing_address,
                },
                user: user
            }
        })
            .then(res => {
                //If stripe return a session URL
                //Redirect to that session URL
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch(err => console.log(err));
    }

    //Order steps
    const stepperSteps = [
        {
            icon: !steps.validated.includes('cart') ? 1 : <Icon name="Check" />,
            text: 'Panier',
            active: steps.current === 'cart',
            disabled: steps.current !== 'cart' && !steps.validated.includes('cart'),
            checked: steps.validated.includes('cart'),
            href: '/cart',
            onClick: () => { }
        }, {
            icon: !steps.validated.includes('addresses') ? 2 : <Icon name="Check" />,
            text: 'Adresse',
            active: steps.current === 'addresses',
            disabled: steps.current !== 'addresses' && !steps.validated.includes('addresses'),
            checked: steps.validated.includes('addresses'),
            href: '',
            onClick: () => setSteps({ current: 'addresses', validated: ['cart'] })
        }, {
            icon: !steps.validated.includes('delivery') ? 3 : <Icon name="Check" />,
            text: 'Livraison',
            active: steps.current === 'delivery',
            disabled: steps.current !== 'delivery' && !steps.validated.includes('delivery'),
            checked: steps.validated.includes('delivery'),
            href: '',
            onClick: () => setSteps({ current: 'delivery', validated: ['cart', 'addresses'] })
        }, {
            icon: !steps.validated.includes('payment') ? 4 : <Icon name="Check" />,
            text: 'Paiement',
            active: steps.current === 'payment',
            disabled: steps.current !== 'payment' && !steps.validated.includes('payment'),
            checked: steps.validated.includes('payment'),
            href: '',
            onClick: () => setSteps({ current: 'payment', validated: ['cart', 'addresses', 'delivery'] })
        }
    ]

    return (
        <React.Fragment>
            <Breadcrumb />
            <div className='py-8'>
                <h1 className="m-0">
                    Commande
                </h1>
            </div>
            <div className='av-stepper mb-12'>
                {stepperSteps.map((step, i) => {
                    return (
                        <div className={`av-stepper-item ${step.active ? 'active' : 'unactive'} ${step.checked ? 'checked' : 'unchecked'} ${step.disabled ? 'disabled' : 'enabled'}`} key={i}>
                            {(step.href && !step.disabled) ? (
                                <Link href={step.href} className={`av-stepper-item-inner`}>
                                    <div className='av-stepper-item-icon'>
                                        {step.icon}
                                    </div>
                                    <div className='av-stepper-item-text'>
                                        {step.text}
                                    </div>
                                </Link>
                            ) : (
                                <div className={`av-stepper-item-inner ${step.disabled ? 'disabled' : 'enabled'}`} onClick={step.onClick}>
                                    <div className='av-stepper-item-icon'>
                                        {step.icon}
                                    </div>
                                    <div className='av-stepper-item-text'>
                                        {step.text}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className='flex items-start gap-x-6 pb-10 md:flex-col md:items-center'>
                <div className='flex-1 md:w-full'>
                    {steps.current === 'addresses' &&
                        <OrderAddressTemplate
                            user={user}
                            deliveryAddress={addresses.delivery_address}
                            billingAddress={addresses.billing_address}
                            onDeliveryAddressSelection={(addresse: Address.Options) => setAddresses(prev => ({ ...prev, delivery_address: addresse }))}
                            onBillingAddressSelection={(addresse: Address.Options) => setAddresses(prev => ({ ...prev, billing_address: addresse }))}
                        />
                    }
                    {steps.current === 'delivery' &&
                        <OrderDeliveryTemplate
                            user={user}
                            carriers={carriers}
                            selectedCarrier={carrier}
                            onCarrierSelection={(carrier) => setCarrier(carrier)}
                        />
                    }
                </div>
                <div className='w-96 flex-shrink-0 rounded-xl overflow-hidden bordered boxshadow-lg-colored md:mt-5 md:w-full'>
                    <div className='py-4 px-2 bg-primary text-center'>
                        <p className='text-2xl font-semibold text-white'>
                            Récapitulatif
                        </p>
                    </div>
                    <div className='p-5 h-full'>
                        <div className='flex justify-between'>
                            <p>{getTotal(cart, 'quantity', 0)} articles</p>
                            <p className='font-semibold'>{formatNumber(getCartTotal().toFixed(2))}€</p>
                        </div>
                        {codePromo &&
                            <div className='flex justify-between mt-3'>
                                <p>Réduction(s)</p>
                                <p className='font-semibold'>-{(getCartTotal() - total).toFixed(2)}€</p>
                            </div>
                        }
                        <div className='flex justify-between mt-3'>
                            <p>Livraison</p>
                            <p className='font-semibold'>{carrier?.price ? `${Number(carrier.price).toFixed(2)}€` : '-'}</p>
                        </div>
                        {codePromo &&
                            <div className='flex py-3'>
                                <div className='w-full'>
                                    <p className='mb-2 font-semibold'>
                                        Code appliqué
                                    </p>
                                    <div className='code-promo'>
                                        <span>CODE</span> {codePromo.code}
                                    </div>
                                    <span className='promo'>-{codePromo.value}%</span>
                                </div>
                                <div
                                    onClick={() => setCodePromo(null)}
                                    className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-md p-2 hover:bg-slate-200"
                                >
                                    <Icon name="Trash" className="h-full w-full" />
                                </div>
                            </div>
                        }
                        <div className='mt-6'>
                            <p className='mb-2'>Ajouter un code promo</p>
                            <div className='flex'>
                                <div className='mr-2 md:w-full'>
                                    <Input
                                        value={codeInput}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodeInput(e.target.value.toUpperCase())}
                                        placeholder="Code promo"
                                    />
                                </div>
                                <Button className='v-primary' onClick={() => handleCodePromo(codeInput)}>
                                    Ajouter
                                </Button>
                            </div>
                        </div>
                        <p className='pt-5 font-semibold'>
                            Codes applicables (non-cumulable)
                        </p>
                        {applicableCodes.length > 0 &&
                            applicableCodes.map((promo, i) => {
                                return (
                                    <div className='py-2' key={i}>
                                        <div className='code-promo' onClick={() => setCodeInput(promo.code)}>
                                            <span>CODE</span> {promo.code}
                                        </div> - Code promo -{promo.value}%
                                        <br />
                                        <p className="mt-1">{promo.description}</p>
                                    </div>
                                )
                            })
                        }
                        <div className='mt-3 mb-5 pt-5 border-t border-slate-200'>
                            <div className='flex items-center justify-between mb-8'>
                                <p className='text-xl'>Total TTC</p>
                                <p className='text-2xl font-bold'>{carrier?.price ? (total + Number(carrier.price)).toFixed(2) : total.toFixed(2)}€</p>
                            </div>
                            {steps.current === 'addresses' &&
                                <Button
                                    className='v-secondary fullwidth !text-lg'
                                    onClick={() => setSteps({ current: 'delivery', validated: ['cart', 'addresses'] })}
                                    disabled={
                                        !addresses.delivery_address
                                        || !addresses.billing_address
                                        || Object.keys(addresses.delivery_address || {}).length === 0
                                        || Object.keys(addresses.billing_address || {}).length === 0
                                    }
                                >
                                    Choisir ma livraison <Icon name="DoubleArrowRight" className="end-icon" />
                                </Button>
                            }
                            {steps.current === 'delivery' &&
                                <Button className="!text-xl v-primary fullwidth" onClick={() => handleStripeCheckout()}>
                                    Procéder au paiment
                                </Button>
                            }
                        </div>
                        <div className='av-divider' />
                        <div className='flex items-center justify-between mt-5'>
                            <div className='payment_items cb'>
                                <Icon name="CB" />
                            </div>
                            <div className='payment_items'>
                                <Icon name="Visa" />
                            </div>
                            <div className='payment_items'>
                                <Icon name="Mastercard" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}