"use client"

import React from "react";
import { CartProduct, Promotion } from "@/types";

interface Props {
    cart: CartProduct[];
    setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    codePromo: Promotion.Options | null;
    setCodePromo: React.Dispatch<React.SetStateAction<Promotion.Options | null>>;
}

export const CartContext = React.createContext<Props>({
    cart: [],
    setCart: () => { },
    codePromo: null,
    setCodePromo: () => { }
})

export default function CartContextProvider({ children }: { children:  React.ReactNode}) {
    //Cart object
    const [cart, setCart] = React.useState<CartProduct[]>([]);
    //Current promotion code applied
    //Initialized in the CartContext to be used and retrieved on all the app
    const [codePromo, setCodePromo] = React.useState<Promotion.Options | null>(null);

    return (
        <CartContext.Provider value={{ cart, setCart, codePromo, setCodePromo }}>
            {children}
        </CartContext.Provider>
    )
}