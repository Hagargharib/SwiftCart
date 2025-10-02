"use client"
import React from "react"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AllOrders() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 ">
            <div className="bg-white shadow-lg rounded-2xl text-center max-w-md w-full p-8">

                <div className="flex justify-center mb-6">
                    <CheckCircle className="text-green-600 w-16 h-16" />
                </div>

                <h1 className="text-3xl font-bold text-green-900 mb-3">
                    Order Placed Successfully 🎉
                </h1>

                <p className="text-gray-600 mb-6">
                    Thank you for shopping with us! You will receive a confirmation email shortly.
                </p>

                <div className=" gap-3">
                    <Link href="/products">
                        <button className="px-6 cursor-pointer py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
                            Continue Shopping
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
