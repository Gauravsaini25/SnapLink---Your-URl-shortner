'use client'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Shorten = () => {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [urllist, seturllist] = useState([]);

  useEffect(() => {
    const fetchlist = async () => {
      let res1 = await fetch('/api/geturls', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("fetch urls response:", res1);
      let res=await res1.json();


      if (res.success) {
        const formattedLinks = res.links.map(link => ({
        orgurl: link.originalUrl,
        shorturl: link.shortUrl
      }));
      seturllist(formattedLinks);

      } else {
        toast(`${res.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });

      }
    }
    fetchlist();

  },[])




  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (!session) {
    return <div className='text-3xl mx-10 my-10 text-black'><div>You must be logged in to generate Urls</div>
      <div>Please <Link className='text-purple-600 font-bold' href='/login'>Log In</Link> to continue</div>
    </div>;
  }





  const handleSubmit = async () => {

    if (!url || !shorturl) {
      alert("please provide both fields")
    }else {
      let data = { "url": url, "shorturl": shorturl };
      let res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log("generate response:", res);
      let response = await res.json()


      console.log(response);
      if (response.success) {
        toast('URL Generated Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        seturllist([...urllist, { orgurl: data.url, shorturl: data.shorturl }]);
        seturl("");
        setshorturl("");
      } else {
        toast(`${response.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });

      }

    }
  }

  const handledelete=async(shorturl)=>{
    // console.log(id);
    let data = { "shorturl": shorturl };
    let res=await fetch('/api/deleteurl',{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    })

    let response=await res.json();
     toast(`${response.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

    });
    if(response.success){
      const updatedList = urllist.filter(link => link.shorturl !== shorturl);
      seturllist(updatedList);

    }

    

  }

  



  return (
    <div className="w-full flex justify-center">
  {session && (
    <div className="bg-purple-50 w-full max-w-3xl mx-auto rounded-2xl shadow-xl mt-10 p-8">
      <div className="flex flex-col items-center text-black gap-6">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <h2 className="text-3xl font-extrabold text-purple-700">Generate Your Short URLs</h2>

        <div className="w-full flex flex-col gap-4">
          <input
            value={url}
            onChange={e => seturl(e.target.value)}
            type="text"
            placeholder="Enter your original URL"
            className="bg-white border border-gray-300 rounded-xl w-full px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
          <input
            value={shorturl}
            onChange={e => setshorturl(e.target.value)}
            type="text"
            placeholder="Enter your preferred short URL"
            className="bg-white border border-gray-300 rounded-xl w-full px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-xl shadow-md transition-all"
        >
          Generate
        </button>
      </div>

      {urllist.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Your Links</h3>
          <div className="flex flex-col gap-4">
            {urllist.map((link, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border border-purple-200 flex flex-col gap-3"
              >
                <div>
                  <span className="font-semibold text-purple-800">Original URL: </span>
                  <Link
                    className="text-purple-600 hover:underline break-all"
                    href={link.orgurl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.orgurl}
                  </Link>
                </div>
                <div>
                  <span className="font-semibold text-purple-800">Short URL: </span>
                  <Link
                    className="text-purple-600 hover:underline"
                    href={`/${link.shorturl}`}
                    target='_blank'
                    rel="noreferrer"
                  >
                    {link.shorturl}
                  </Link>
                </div>
                <div className="flex gap-4">
                 
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-xl shadow-md transition-all"
                    onClick={() => handledelete(link.shorturl)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
</div>

  )
}

export default Shorten
