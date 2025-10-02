"use client";
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface Inputs {
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  async function onSubmit(values: Inputs) {
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (response?.error) {
         console.error("API Error:", response.error);
        const friendly = response.error === "CredentialsSignin"
          ? "Email or password is incorrect"
          : response.error;

        setErrorMessage(friendly || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      if (response?.ok) {
        // success -> navigate
        router.push("/");
      } else {
        // fallback unexpected error
        setErrorMessage("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
            Login
          </h2>

          {/* Error message */}
          {errorMessage && (
            <div className="mb-4 text-center text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "email is required" })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="you@example.com"
                onFocus={() => setErrorMessage(null)}
              />
              {errors.email && (<p className='text-red-800'>{errors.email.message}</p>)}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "password is required" })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
                onFocus={() => setErrorMessage(null)}
              />
              {errors.password && (<p className='text-red-800'>{errors.password.message}</p>)}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "opacity-70 cursor-not-allowed" : ""} bg-green-600 hover:bg-green-700 transition-all rounded-lg py-5 text-lg font-medium text-white shadow-md`}
              aria-busy={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>

            <div className="text-center">
              <Link className="cursor-pointer hover:text-green-700 text-sm" href="/forgetpass">
                Forget password?
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
