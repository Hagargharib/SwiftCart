"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const { register, handleSubmit } = useForm<{ code: string }>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = params?.get("email") ?? "";

  async function onSubmit(values: { code: string }) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.code }
      );

      toast.success(res.data.message || "Code verified!");

      // Navigate to resetpassword page
      router.push(`/resetpass?email=${email}&resetCode=${values.code}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Verify Code</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Verification Code</label>
            <input
              type="text"
              {...register("code", { required: true })}
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
