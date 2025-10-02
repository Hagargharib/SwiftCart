"use client"

import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Trash2, XCircle, Plus, Minus } from "lucide-react"
import { useCart } from '@/app/context/CartContext'
import { deleteProduct, UpdateProduct } from '@/actions/cart.action'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function CartTable() {
    const { cartDetails, getCartDetails } = useCart();

    // delete product 
    async function removeProductFromCart(productId: string) {
        const response = await deleteProduct(productId);
        toast.success("Product deleted successfully from your cart", {
            icon: <XCircle className="text-red-600" />,
        });
        await getCartDetails();
    }

    // update product
    async function updateProductFromCart(productId: string, count: number) {
        const response = await UpdateProduct(productId, count);
        toast.success("Product Updated successfully ");
        await getCartDetails();
    }

    return (
        <>
            {cartDetails && cartDetails.data.products.length > 0 ? (
                <div className="w-11/12 lg:w-3/4 mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-4xl font-semibold text-green-900 mb-6 text-center">
                        Your Cart
                    </h2>

                    <Table>
                        {/* table head */}
                        <TableHeader>
                            <TableRow className="bg-green-50">
                                <TableHead className="w-[120px]">Product</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-center">Remove</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* body */}
                        <TableBody>
                            {cartDetails?.data.products.map((product) => (
                                <TableRow key={product._id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="relative w-16 h-16">
                                            <Image
                                                src={product.product.imageCover}
                                                alt={product.product.title}
                                                sizes="64px"
                                                fill
                                                className="rounded-md"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-green-900">
                                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                                    </TableCell>

                                    {/* Quantity with plus & minus */}
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => updateProductFromCart(product.product._id, product.count - 1)}
                                                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-green-700"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="min-w-[20px] text-gray-800 font-medium">
                                                {product.count}
                                            </span>
                                            <button
                                                onClick={() => updateProductFromCart(product.product._id, product.count + 1)}
                                                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-green-700"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        ${product.price}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        ${product.price * product.count}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <button
                                            onClick={() => removeProductFromCart(product.product._id)}
                                            className="text-red-600 cursor-pointer hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* checkout */}
                    <div className="flex justify-end mt-6">
                        <div className="text-right space-y-2">
                            <p className="text-md font-bold text-green-900">
                                SubTotal: ${cartDetails?.data?.totalCartPrice}
                            </p>
                            <p className="text-md font-bold text-green-900">
                                Shipping: $40
                            </p>
                            <p className="text-lg font-bold text-green-900">
                                TOTAL: ${(cartDetails?.data?.totalCartPrice || 0) + 40}
                            </p>
                            <Link href="/checkout">
                                <button className="cursor-pointer mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
                    <h1 className="text-center text-3xl text-green-700 font-bold">
                        Your Cart Is Empty!
                    </h1>
                    <Link href="/products">
                        <button className="cursor-pointer px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition">
                            Go Shopping
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}
