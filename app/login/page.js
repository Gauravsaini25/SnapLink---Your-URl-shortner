'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter();

  const handleSubmit=async()=>{
    if (email.length > 0 && username.length > 0 && password.length > 0) {
      let data = { "email": email, "username": username,"password":password };
      let res = await signIn("credentials",{
        redirect:false,
        email,
        username,
        password,
      })

      if(res.error){
        alert(res.error);
      }else{
        router.push("/");
      }
      

    } else {
      alert("please provide all the details");
      return;
    }


  }
  return (
    <div className="min-h-[91.5vh] flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
  <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-8">
    <div className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Log In</div>

    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium text-gray-700">Your Email</p>
        <input type="text" value={email} onChange={e => setemail(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-xl w-full py-2 px-3 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all text-black" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">Your Username</p>
        <input type="text" value={username} onChange={e => setusername(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-xl w-full py-2 px-3 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all text-black" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">Your Password</p>
        <input type="password" value={password} onChange={e => setpassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-xl w-full py-2 px-3 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all text-black" />
      </div>
    </div>

    <button
      onClick={handleSubmit}
      className="w-full bg-purple-500 hover:bg-purple-600 active:scale-95 transition-all text-white font-semibold py-2 px-5 rounded-xl shadow-md mt-6"
    >
      Log In
    </button>

    
    <p className="text-center text-sm text-gray-600 mt-1">
      Don't have an account?<Link href='/signup'><span className="text-purple-600 cursor-pointer hover:underline ">Sign Up</span></Link>
    </p>
  </div>
</div>

  )
}

export default Login
