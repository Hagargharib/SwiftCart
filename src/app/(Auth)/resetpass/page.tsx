"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const { register, handleSubmit } = useForm<{ password: string; confirm: string }>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const resetToken = params?.get("token") ?? "";
    const email = params?.get("email") ?? "";

    async function onSubmit(values: { password: string; confirm: string }) {
        if (values.password !== values.confirm) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                email,
                newPassword: values.password,
                resetCode: resetToken,
            };
            const res = await axios.put(
                "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                payload
            );

            toast.success(res.data.message || "Password reset successful");
            router.push("/login");
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast.error(axiosError.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm">New Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirm", { required: true })}
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
