import { getUserCart } from '@/actions/cart.action';
import CartTable from '@/components/CartTable-compo/CartTable'
import React from 'react'

export default async function Cart() {
  return (
    <div>
      <CartTable  />

    </div>
  )
}
