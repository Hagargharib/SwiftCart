"use client";
import { Button } from '@/components/ui/button'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const password = watch("password");
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: Inputs) {
    setLoading(true);
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log(response);
      if (response?.data.message === "success") {
        router.push("/login")

      }
      setErrorMessage(null);


    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data.message);

        setErrorMessage(error.response?.data.message);
      }

    }
    finally {
      setLoading(false);
    }
  }
  return (

    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
            Register
          </h2>

          {errorMessage && <p className='text-red-800 font-semibold text-center'>{errorMessage}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Hagar Mohamed"
                {...register("name", {
                  required: "name is required", minLength: {
                    value: 4,
                    message: "Name must be at least 4 characters"
                  }
                })}
              />
              {errors.name && (<p className='text-red-800'>{errors.name.message}</p>)}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="you@example.com"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (<p className='text-red-800'>{errors.email.message}</p>)}

            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
                {...register("password", {
                  required: "password is required", pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
                  }
                })}

              />
              {errors.password && (<p className='text-red-800'>{errors.password.message}</p>)}

            </div>

            {/* repassword */}
            <div>
              <label
                htmlFor="re-password"
                className="block text-sm font-medium text-gray-700"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="re-password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"

                {...register("rePassword", { required: "re-password is required", validate: (value) => value === password || "Passwords do not match" })}


              />
              {errors.rePassword && (<p className='text-red-800'>{errors.rePassword.message}</p>)}
            </div>

            {/* phone */}
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
                {...register("phone", {
                  required: "phone number is required", pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone must be 11 digits"
                  }
                })}

              />
              {errors.phone && (<p className='text-red-800'>{errors.phone.message}</p>)}

            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-green-600 hover:bg-green-700 transition-all rounded-lg py-5 text-lg font-medium text-white shadow-md"
            >
              {loading ? "Registering..." : "Register"}

            </Button>
          </form>


          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-700 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </>
  )
}
