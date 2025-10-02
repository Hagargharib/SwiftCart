import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-8xl font-extrabold">404</h1>
      <p className="text-xl mt-4 opacity-70">Oops! This page doesn’t exist.</p>
      <Link href="/" className="mt-6 btn btn-outline btn-light">
        Go Home
      </Link>
    </div>
  );
}

