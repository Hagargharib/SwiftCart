"use server"

import axios from "axios"

async function getAllCategories() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        return {
            data: response?.data.data,
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

export{
    getAllCategories
}