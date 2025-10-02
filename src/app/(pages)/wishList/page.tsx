import { getUserWishList } from '@/actions/wishlist.action';
import WishListTable from '@/components/wishList-compo/WishListTable'
import React from 'react'

export default async function WishList() {
  const { data: wishlist } = await getUserWishList();
  return (
    <div>
      <WishListTable wishlist={wishlist}/>
    </div>
  )
}
