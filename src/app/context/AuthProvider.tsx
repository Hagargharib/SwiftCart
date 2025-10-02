"use client";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";
import { Toaster } from "react-hot-toast";
import WishlistContextProvider from "./wishlistContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CartContextProvider>
                <WishlistContextProvider>
                    {children}
                </WishlistContextProvider>
            </CartContextProvider>

            <Toaster position="top-center" reverseOrder={false} />
        </SessionProvider>
    );
}
