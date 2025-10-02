import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from '@/actions/cart.action';
import { CartData } from "../types/cart.model";

interface cartContextType {
    cartDetails: CartData | null;
    getCartDetails: () => Promise<void>;
    setCartDetails: (cart: CartData | null) => void;
}


const CartContext = createContext<cartContextType>({
    cartDetails: null,
    getCartDetails: async () => { },
    setCartDetails: () => { }

});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState(null);

    async function getCartDetails() {
        const response = await getUserCart();

        setCartDetails(response?.data);

    }


    useEffect(() => {
        getCartDetails()
    }, [])

    return <CartContext.Provider value={{ cartDetails, setCartDetails, getCartDetails }}>{children}</CartContext.Provider>
}


export function useCart() {
    const myCartContext = useContext(CartContext);
    return myCartContext
}