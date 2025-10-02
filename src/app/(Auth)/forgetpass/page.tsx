"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgetPass() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: { email: string }) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: values.email }
      );

      toast.success(res.data.message || "Verification code sent");

      router.push(`/verifycode?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              {...register("email", { required: true })}
              className="w-full mt-1 border rounded px-3 py-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
