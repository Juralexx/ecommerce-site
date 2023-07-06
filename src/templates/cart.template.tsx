"use client"

import React from 'react'
import Image from 'next/image'
import { Breadcrumb, Button, CircleLoader, Divider, IconButton, Input, QuantityInput } from '../components/global'
import useCart from '@/functions/useCart'
import { CartContext } from '@/contexts/CartContext'
import Icon from '../components/global/icons/Icon'
import { formatNumber, getTotal } from '@/functions/utils'
import { createCheckout } from '@/api/checkout'

export default function CartTemplate() {
    //Promotion code input value
    const [codeInput, setCodeInput] = React.useState<string>('');
    //User cart
    const { cart, setCart, codePromo, setCodePromo } = React.useContext(CartContext);

    const {
        total,
        getCartTotal,
        removeProductFromCart,
        handleCartQuantity,
        handleCodePromo,
        applicableCodes,
        isCartFetched
    } = useCart({ cart, setCart, codePromo, setCodePromo });

    /**
     * Create a new checkout
     */

    const createNewCheckout = async () => {
        const checkoutStorage = localStorage.getItem('checkout_id');
        if (!checkoutStorage) {
            // const { errors, data } = await createCheckout()
        }
    }

    return (
        <React.Fragment>
            <Breadcrumb />
            <div className='py-8'>
                <h1 className="m-0">
                    Mon panier <span className='text-xl txt-sec font-normal'>({getTotal(cart, 'quantity', 0)} articles)</span>
                </h1>
            </div>
            {isCartFetched ? (
                <div className='flex items-start gap-x-6 pb-10 md:flex-col md:items-center'>
                    <div className='flex-1 md:w-full'>
                        {cart.length > 0 ? (
                            cart.map((product, i) => {
                                return (
                                    <div className='flex items-stretch p-5 rounded-xl mb-3 last:mb-0 bordered boxshadow-lg-colored' key={i}>
                                        <Image
                                            src={`${process.env.SERVER_URL}${product?.image}`}
                                            height={125}
                                            width={125}
                                            style={{ height: 125, width: 125, objectFit: 'cover', borderRadius: 4 }}
                                            alt={product.name || ''}
                                            title={product.name}
                                        />
                                        <div className='flex justify-between flex-grow pl-5'>
                                            <div className='flex flex-col justify-between'>
                                                <div>
                                                    <p className='text-xl font-semibold'>{product.name}</p>
                                                    <p className='txt-sec'>{`Pot : ${product.variant.size}L - Hauteur : ${product.variant.height}cm`}</p>
                                                </div>
                                                <div className='flex items-baseline'>
                                                    <div className='text-lg'>
                                                        {product.quantity} x {product.price.toFixed(2)}€
                                                    </div>
                                                    {product.promotion > 0 &&
                                                        <>
                                                            <div className='has-discount ml-3'>
                                                                {product.original_price}€
                                                            </div>
                                                            <div className='promo'>
                                                                -{product.promotion}%
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-between items-end'>
                                                <div className='flex'>
                                                    <QuantityInput
                                                        min="1"
                                                        max={product.variant.stock}
                                                        value={product.quantity}
                                                        onChange={(value: number) => handleCartQuantity(product.variant, value)}
                                                    />
                                                    <IconButton className="v-text ml-3" onClick={() => removeProductFromCart(i)}>
                                                        <Icon name="Trash" />
                                                    </IconButton>
                                                </div>
                                                <div className='font-semibold text-xl'>
                                                    {(product.price * product.quantity).toFixed(2)}€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='flex flex-col items-center justify-center text-center md:mb-20'>
                                <img
                                    src={`/img/empty-cart.png`}
                                    style={{ height: 'auto', width: 350, objectFit: 'cover', borderRadius: 8 }}
                                    alt={'Panier vide'}
                                />
                                <div className='text-3xl font-semibold mt-7'>
                                    Votre panier est vide !
                                </div>
                                <p className='text-lg pt-2 pb-5'>Laissez-nous vous aider à le remplir</p>
                                <Button href="/" className="v-primary is-link">
                                    Découvrir nos produits
                                </Button>
                            </div>
                        )}
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
                                <p className='font-semibold'>-</p>
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
                                    <p className='text-2xl font-bold'>{total.toFixed(2)}€</p>
                                </div>
                                <Button href='/order' className="!text-xl v-primary is-link fullwidth" disabled={cart.length <= 0}>
                                    Valider la commande
                                </Button>
                            </div>
                            <Divider />
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
            ) : (
                <CircleLoader />
            )}
        </React.Fragment>
    )
}