"use client"

import React from "react";
import Image from "next/image";
import { IconButton, QuantityInput, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@/components/global';
import useCartPopup from '../contexts/cart-popup/useCartPopup';
import useCart from "@/functions/useCart";
import { CartContext } from "@/contexts/CartContext";
import Icon from '@/components/global/icons/Icon';
import { formatNumber, getTotal } from "@/functions/utils";

const CartPopup = () => {
    const { openCartPopup, setOpenCartPopup } = useCartPopup();
    //User cart
    const { cart, setCart, codePromo, setCodePromo } = React.useContext(CartContext);

    const {
        total,
        getCartTotal,
        removeProductFromCart,
        handleCartQuantity,
    } = useCart({ cart, setCart, codePromo, setCodePromo })

    return (
        <Dialog
            open={openCartPopup}
            onClose={() => setOpenCartPopup(false)}
            mobileFull
        >
            <DialogTitle>
                <Icon name="Check" className="inline mr-2" /> Produit ajouté au panier
            </DialogTitle>
            <Divider />
            <DialogContent>
                <div className="side">
                    <div className="side-header">
                        <h2>Mon panier</h2>
                    </div>
                    <div className="overflow-y-auto">
                        {cart && cart.length > 0 ? (
                            cart.map((product, i) => {
                                return (
                                    <div className="flex items-stretch py-4 border-bottom" key={i}>
                                        <div className="relative w-12 h-12">
                                            <Image
                                                src={`${process.env.SERVER_URL}${product?.image}`}
                                                sizes="50px"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                alt={product.name || ''}
                                                title={product.name}
                                            />
                                        </div>
                                        <div className='flex justify-between flex-grow pl-5'>
                                            <div className='flex flex-col justify-between'>
                                                <div>
                                                    <p className='title'>{product.name}</p>
                                                    <p className='txt-sec'>{`Pot : ${product.variant.size}L - Hauteur : ${product.variant.height}cm`}</p>
                                                </div>
                                                <div className='flex items-baseline mt-2'>
                                                    <div className='price'>
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
                                            <div className='flex flex-col justify-between items-end ml-8'>
                                                <div className='flex'>
                                                    <div className="w-24">
                                                        <QuantityInput
                                                            min="1"
                                                            max={product.variant.stock}
                                                            value={product.quantity}
                                                            onChange={(value: number) => handleCartQuantity(product.variant, value)}
                                                        />
                                                    </div>
                                                    <IconButton className='v-text ml-3' onClick={() => removeProductFromCart(i)}>
                                                        <Icon name="Trash" />
                                                    </IconButton>
                                                </div>
                                                <div className='font-bold'>
                                                    {(product.price * product.quantity).toFixed(2)}€
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>Il n'y a pas d'articles dans votre panier</p>
                        )}
                    </div>
                    <div className='flex item-center justify-between pt-4'>
                        <p>{getTotal(cart, 'quantity', 0)} articles</p>
                        <p className='font-semibold'>{formatNumber(getCartTotal().toFixed(2))}€</p>
                    </div>
                    <div className='cart-total'>
                        <div className='flex item-center justify-between py-2'>
                            <p>Livraison</p>
                            <p className='font-semibold'>-</p>
                        </div>
                        <div className='flex item-center justify-between'>
                            <p className="text-xl font-semibold">Total TTC</p>
                            <p className='text-2xl font-semibold'>{formatNumber(total.toFixed(2))}€</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button className='v-text' onClick={() => setOpenCartPopup(false)}>
                    Continuer mes achats
                </Button>
                <Button href='/cart' className='v-primary is-link'>
                    Aller au panier
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CartPopup;