
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getUserWishList, addToWishList, removeFromWishList } from "@/actions/wishlist.action";
import toast from "react-hot-toast";
import { WishlistData } from "../types/wishlist.modal";

interface WishlistContextType {
    wishlistDetails: WishlistData | null;
    getWishlistDetails: () => Promise<void>;
    addWishlistItem: (productId: string) => Promise<void>;
    removeWishlistItem: (productId: string) => Promise<void>;
    isInWishlist: (id: string) => boolean; // ✅ added
}

const WishlistContext = createContext<WishlistContextType>({
    wishlistDetails: null,
    getWishlistDetails: async () => { },
    addWishlistItem: async () => { },
    removeWishlistItem: async () => { },
    isInWishlist: () => false,
});

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const [wishlistDetails, setWishlistDetails] = useState<WishlistData | null>(null);

    const getWishlistDetails = useCallback(async () => {
        try {
            const res = await getUserWishList();
            const products = res?.data?.data ?? res?.data ?? [];
            setWishlistDetails({ data: products, count: products?.length ?? 0 });
        } catch (err) {
            setWishlistDetails({ data: [], count: 0 });
        }
    }, []);

    const addWishlistItem = async (productId: string) => {
        try {
            await addToWishList(productId);
            await getWishlistDetails(); // ✅ refresh
            toast.success("Added to wishlist");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add to wishlist");
        }
    };

    const removeWishlistItem = async (productId: string) => {
        try {
            await removeFromWishList(productId);
            await getWishlistDetails();
            toast.success("Removed from wishlist");
        } catch (err) {
            toast.error("Failed to remove from wishlist");
        }
    };

    const isInWishlist = (id: string) => {
        return wishlistDetails?.data?.some((item) => item._id === id) ?? false;
    };

    useEffect(() => {
        getWishlistDetails();
    }, [getWishlistDetails]);

    return (
        <WishlistContext.Provider
            value={{
                wishlistDetails,
                getWishlistDetails,
                addWishlistItem,
                removeWishlistItem,
                isInWishlist, // ✅ expose it
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
