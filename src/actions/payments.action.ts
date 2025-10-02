
"use server"

import { getUserToken } from "@/lib/token.utility";
import axios from "axios"

interface shippingAddressType {
    details: string,
    phone: string,
    city: string
}


async function getCashPayment(cartId: string, shippingAddress:{shippingAddress:shippingAddressType}) {
    try {

        const token = await getUserToken();

        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress },
            {
                headers: {
                    token: token as string,
                }
            });
            
        return {
            data: response?.data,
            status: response?.data,
            message: response?.data.message
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
async function getOnlinePayment(cartId: string, shippingAddress:{shippingAddress:shippingAddressType}) {
    try {

        const token = await getUserToken();

        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, { shippingAddress },
            {
                headers: {
                    token: token as string,
                }
            });
        return {
            data: response?.data,
            status: response?.data,
            message: response?.data.message
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

export {
getCashPayment,
getOnlinePayment
}