"use server"

import { getUserToken } from "@/lib/token.utility";
import axios from "axios"

async function getUserWishList() {
    try {

        const token = await getUserToken();

        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: token as string,
            }
        });
        
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message || "success"
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message: error?.response?.data.message || "an error occured"
            }
        }

    }

}
async function addToWishList(productId: string) {
    try {

        const token = await getUserToken();

        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId },
            {
                headers: {
                    token: token as string,
                }
            });
        
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message || "success"
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message: error?.response?.data.message || "an error occured"
            }
        }

    }

}

async function removeFromWishList(productId: string) {
    try {
        const token = await getUserToken();

        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token: token as string,
            },
        });

        

        return {
            data: response.data,
            status: response.status,
            message: response.data.message || "Removed from wishlist",
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message: error.response?.data?.message || "An error occurred",
            };
        }
        return {
            data: [],
            status: 500,
            message: "Unknown error",
        };
    }
}


export {
    getUserWishList,
    addToWishList,
    removeFromWishList,
}