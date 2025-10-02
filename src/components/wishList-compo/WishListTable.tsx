"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";
import { removeFromWishList } from "@/actions/wishlist.action";
import { addProductToCart } from "@/actions/cart.action";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/context/wishlistContext";

export default function WishlistTable() {
  const { wishlistDetails, getWishlistDetails } = useWishlist();
  const { getCartDetails } = useCart();

  async function handleRemove(productId: string) {
    await removeFromWishList(productId);
    toast.success("Product removed from wishlist");
    await getWishlistDetails();
  }

  async function handleAddToCart(productId: string) {
    await addProductToCart(productId);
    toast.success("Product added to cart");
    await getCartDetails();
    await getWishlistDetails();
  }

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-3xl font-semibold text-green-900 mb-6 text-center">
        Your Wishlist
      </h2>

      {wishlistDetails && wishlistDetails.data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50">
              <TableHead className="w-[120px]">Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlistDetails.data.map((product) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      sizes="64px"
                      fill
                      className="rounded-md"
                    />
                  </div>

                </TableCell>
                <TableCell className="font-medium text-green-900">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${product.price}
                </TableCell>
                <TableCell className="flex items-center gap-3 justify-center ">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-700 text-white rounded-lg hover:bg-green-800 transition text-sm"
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
}
