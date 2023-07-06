"use client"

import React from "react";
import Image from "next/image";
import useCart from "@/functions/useCart";
import useClickOutside from "@/components/global/hooks/useClickOutside";
import { addActive, formatNumber, getTotal } from "@/functions/utils";
import Icon from '@/components/global/icons/Icon';
import { Badge, Button, IconButton, Input, QuantityInput } from "@/components/global";
import { CartContext } from "@/contexts/CartContext";

const CartSidebar = () => {
    //Define a Reference to be able to close the sidebar on click outside
    const sideRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
    useClickOutside(sideRef, () => setOpenCart(false));
    //Open cart sidebar
    const [openCart, setOpenCart] = React.useState(false);
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
        applicableCodes
    } = useCart({ cart, setCart, codePromo, setCodePromo })

    return (
        <>
            <IconButton className='v-default' onClick={() => setOpenCart(!openCart)}>
                <Icon name="ShoppingBasket" />
                <Badge value={cart.length} />
            </IconButton>

            <div className={`av-sidemenu ${addActive(openCart)}`}>
                <div className="av-side" ref={sideRef}>
                    <div className="flex justify-between items-center w-full mb-5">
                        <h2 className="m-0">Mon panier</h2>
                        <Icon name="Cross" className="cross" onClick={() => setOpenCart(false)} />
                    </div>
                    {cart.length > 0 ? (
                        cart.map((product, i) => {
                            return (
                                <div className="flex items-stretch py-4 border-bottom" key={i}>
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={`${process.env.SERVER_URL}${product?.image}`}
                                            sizes="50px"
                                            fill
                                            style={{ objectFit: 'cover', borderRadius: 4 }}
                                            alt={product.name || ''}
                                            title={product.name}
                                        />
                                    </div>
                                    <div className='flex justify-between flex-grow pl-5'>
                                        <div className='flex flex-col justify-between'>
                                            <div>
                                                <p className='font-semibold'>{product.name}</p>
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
                                        <div className='flex flex-col justify-between items-end ml-2'>
                                            <div className='flex'>
                                                <div className="w-24">
                                                    <QuantityInput
                                                        min="1"
                                                        max={product.variant.stock}
                                                        value={product.quantity}
                                                        onChange={(value: number) => handleCartQuantity(product.variant, value)}
                                                    />
                                                </div>
                                                <IconButton className='v-text small ml-3' onClick={() => removeProductFromCart(i)}>
                                                    <Icon name="Trash" />
                                                </IconButton>
                                            </div>
                                            <div className='font-semibold'>
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
                    <div className='flex justify-between py-4'>
                        <p>{getTotal(cart, 'quantity', 0)} articles</p>
                        <p className='font-semibold'>{formatNumber(getCartTotal().toFixed(2))}€</p>
                    </div>
                    {codePromo &&
                        <div className='flex justify-between mt-3'>
                            <p>Réduction(s)</p>
                            <p className='font-semibold'>-{(getCartTotal() - total).toFixed(2)}€</p>
                        </div>
                    }
                    {codePromo &&
                        <div className='flex py-3'>
                            <div>
                                <p className='mb-2 font-semibold'>
                                    Code appliqué
                                </p>
                                <div className='code-promo'>
                                    <span>CODE</span> {codePromo.code}
                                </div> - Code promo -{codePromo.value}%
                                <br />
                                <p className="mt-1">{codePromo.description}</p>
                            </div>
                            <div
                                onClick={() => setCodePromo(null)}
                                className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-md p-1 hover:bg-slate-200"
                            >
                                <Icon name="Trash" />
                            </div>
                        </div>
                    }
                    <div className='mt-6'>
                        <p className='mb-2 font-semibold'>Ajouter un code promo</p>
                        <div className='flex'>
                            <div className='mr-2 w-full'>
                                <Input
                                    value={codeInput}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodeInput(e.target.value.toUpperCase())}
                                    placeholder="Code promo"
                                />
                            </div>
                            <Button onClick={() => handleCodePromo(codeInput)} className='v-primary'>
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
                                <div className='py-3' key={i}>
                                    <div className='code-promo' onClick={() => setCodeInput(promo.code)}>
                                        <span>CODE</span> {promo.code}
                                    </div> - Code promo -{promo.value}%
                                    <br />
                                    <p className="mt-1">{promo.description}</p>
                                </div>
                            )
                        })
                    }
                    <div className='mt-3 pt-5 border-t border-slate-200'>
                        <div className='flex items-center justify-between pb-2'>
                            <p className="text-lg">Livraison</p>
                            <p className='text-lg font-bold'>-</p>
                        </div>
                        <div className='flex items-center justify-between mb-8'>
                            <p className="text-lg">Total TTC</p>
                            <p className='text-xl font-bold'>
                                {formatNumber(total.toFixed(2))}€
                            </p>
                        </div>
                        <Button className="!text-2xl fullwidth v-primary is-link" href="/cart" onClick={() => setOpenCart(false)}>
                            Aller au panier
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartSidebar;