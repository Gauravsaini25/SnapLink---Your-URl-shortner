'use client'
import React ,{useEffect}from 'react'
// import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';


const redirecttourl = ({params}) => {
 
  // const router = useRouter();

  useEffect(() => {
    const fetchOriginalUrl=async()=>{
      let shorturl=await params.shorturl;
      console.log("shorturl:",shorturl);
      let data = {  "shorturl":shorturl  };
      let res = await fetch('/api/fetchurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let response=await res.json();
      if(response.success){
        let choice =confirm("do you want to redirect to original url?");

        if(!choice){ 
          redirect('/');
          return;
        }
        setTimeout(()=>{
            redirect(response.originalUrl);
        },500)
      }else{
        alert(response.message);
        redirect('/');
      }

    }
    fetchOriginalUrl();
  
  }, [])
  

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default redirecttourl
