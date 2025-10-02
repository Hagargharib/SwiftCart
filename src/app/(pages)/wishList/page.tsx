import { getUserWishList } from '@/actions/wishlist.action';
import WishListTable from '@/components/wishList-compo/WishListTable'
import React from 'react'

export default async function WishList() {
  const response = await getUserWishList();
  
  if (!response?.data) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
          <p className="text-gray-600 mt-2">Start adding some products to your wishlist!</p>
        </div>
      </div>
    );
  }

  const wishlist = response.data;

  return (
    <div>
      <WishListTable wishlist={wishlist}/>
    </div>
  )
}