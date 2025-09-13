'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const Navbar = () => {
  const {data:session,status}=useSession();

  return (
    <div className="flex justify-between items-center h-16 bg-gradient-to-r from-purple-600 to-purple-700 px-6 md:px-10 shadow-md">
  <Link href="/">
    <div className="text-3xl font-extrabold tracking-wide text-white hover:text-purple-200 transition-colors">
      SnapLink
    </div>
  </Link>
  <ul className="flex gap-5 items-center text-white font-medium">
    <Link href="/"><li className="relative group cursor-pointer">Home
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
    </li></Link>
    <Link href="/shorten"><li className="relative group cursor-pointer">Shorten
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
    </li></Link>

    {!session && (
      <div className="flex gap-3">
        <Link href="/login"><button className="bg-purple-500 hover:bg-purple-400 transition-all duration-300 py-2 px-4 rounded-xl shadow-sm">Login</button></Link>
        <Link href="/signup"><button className="bg-purple-500 hover:bg-purple-400 transition-all duration-300 py-2 px-4 rounded-xl shadow-sm">Signup</button></Link>
      </div>
    )}

    {session && (
      <button
        onClick={() => { signOut({ callbackUrl: '/' }) }}
        className="bg-purple-500 hover:bg-purple-400 transition-all duration-300 py-2 px-4 rounded-xl shadow-sm"
      >
        SignOut
      </button>
    )}
  </ul>
</div>

  )
}

export default Navbar
