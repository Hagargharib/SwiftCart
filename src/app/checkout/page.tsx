"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { getCashPayment, getOnlinePayment } from '@/actions/payments.action';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Register() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)
    const router = useRouter();

    const { cartDetails, setCartDetails } = useCart();
    const cartId = cartDetails?.cartId


    interface Inputs {
        details: string;
        city: string;
        phone: string
    }
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    async function onSubmit(values: Inputs) {

        if (paymentMethod === "cash") {
            try {
                const response = await getCashPayment(cartId as string, values);
                console.log(response);
                if (response?.data.status === "success") {
                    // clear cart after checking out
                    setCartDetails(null);
                    // redirect to home after check out
                    router.push("/allorders");
                }
            } catch (error) {
            }

        }
        else if (paymentMethod == "online") {
            try {
                const response = await getOnlinePayment(cartId as string, values);
                if (response?.data.status === "success") {
                    window.location.href = response.data.session.url
                }
            } catch (error) {
            }
        }
    }

    return (

        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                        Payment
                    </h2>

                    {errorMessage && <p className='text-red-800 font-semibold text-center'>{errorMessage}</p>}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Details */}
                        <div>
                            <label
                                htmlFor="details"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Details
                            </label>
                            <input
                                type="text"
                                id="details"
                                placeholder="details..."
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                {...register("details", { required: "details are required" })}
                            />
                            {errors.details && (<p className='text-red-800'>{errors.details.message}</p>)}
                        </div>

                        {/* phone */}
                        <div>
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                placeholder="ex.cairo"

                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                {...register("city", { required: "city is required" })}

                            />
                            {errors.city && (<p className='text-red-800'>{errors.city.message}</p>)}

                        </div>

                        {/* city */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                placeholder="Phone no."
                                {...register("phone", { required: "phone number is required" })}

                            />
                            {errors.phone && (<p className='text-red-800'>{errors.phone.message}</p>)}

                        </div>

                        {/* pay Button */}
                        <RadioGroup onValueChange={(val) => setPaymentMethod(val as "online" | "cash")} >
                            <div className="flex items-center space-x-2 pb-3">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash Payment</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="online" id="online" />
                                <Label htmlFor="online">Online Payment</Label>
                            </div>
                        </RadioGroup>

                        <Button
                            type="submit"
                            className="cursor-pointer w-full bg-green-600 hover:bg-green-700 transition-all rounded-lg py-5 text-lg font-medium text-white shadow-md"
                        >
                            Check Out
                        </Button>
                    </form>

                </div>
            </div>

        </>
    )
}
