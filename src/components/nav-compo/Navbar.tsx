"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@images/fav.png";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const { cartDetails } = useCart();
  const { wishlistDetails } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={32} height={32} />
          <span className="text-2xl font-semibold dark:text-white">
            Swift Cart
          </span>
        </Link>

        {/* big screens Nav Links */}
        {session && (
          <ul className="hidden md:flex gap-8 font-medium dark:text-white">
            <li><Link href="/" className={path === "/" ? "active" : ""}>Home</Link></li>
            <li><Link href="/products" className={path === "/products" ? "active" : ""}>Products</Link></li>
            <li><Link href="/categories" className={path === "/categories" ? "active" : ""}>Categories</Link></li>
            <li><Link href="/brands" className={path === "/brands" ? "active" : ""}>Brands</Link></li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="cursor-pointer hover:text-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {!session && (
          <ul className="hidden md:flex gap-6 font-medium dark:text-white">
            <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link href="/register" className="hover:text-blue-600">Register</Link></li>
          </ul>
        )}


        {session && (
          <div className="hidden md:flex items-center gap-5 text-2xl ms-8">
            {/* Wishlist */}
            <Link href="/wishList">
              <button className="relative cursor-pointer">
                {wishlistDetails?.count > 0 && (
                  <Badge className="bg-green-700 absolute -top-2 -right-2 px-1.5 py-0.5 text-xs rounded-full">
                    {wishlistDetails.count}
                  </Badge>
                )}
                <Heart className="w-6 h-6" />
              </button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <button className="relative cursor-pointer">
                {cartDetails?.numOfCartItems > 0 && (
                  <Badge className="bg-green-700 absolute -top-2 -right-2 px-1.5 py-0.5 text-xs rounded-full">
                    {cartDetails.numOfCartItems}
                  </Badge>
                )}
                <ShoppingCart className="w-6 h-6" />
              </button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t p-4">
          <ul className="flex flex-col gap-4 font-medium">
            {session ? (
              <>
                <li><Link className={path === "/" ? "active" : ""} href="/">Home</Link></li>
                <li><Link className={path === "/products" ? "active" : ""} href="/products">Products</Link></li>
                <li><Link className={path === "/categories" ? "active" : ""} href="/categories">Categories</Link></li>
                <li><Link className={path === "/brands" ? "active" : ""} href="/brands">Brands</Link></li>
                <li><Link href="/wishList">  <Heart></Heart> </Link></li>
                <li><Link href="/cart"><ShoppingCart></ShoppingCart> </Link></li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
