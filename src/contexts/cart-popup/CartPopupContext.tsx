"use client"

import React from "react";

interface Props {
    openCartPopup: boolean;
    setOpenCartPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartPopupContext = React.createContext<Props>({
    openCartPopup: false,
    setOpenCartPopup: () => { }
})

export default function CartPopupContextProvider({ children }: { children:  React.ReactNode}) {
    //Cart popup boolean to handle open state
    const [openCartPopup, setOpenCartPopup] = React.useState<boolean>(false);

    return (
        <CartPopupContext.Provider value={{ openCartPopup, setOpenCartPopup }}>
            {children}
        </CartPopupContext.Provider>
    )
}