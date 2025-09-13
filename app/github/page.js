'use client'
import React, { useEffect } from 'react'

import { redirect } from 'next/navigation'

const page = () => {
    useEffect(() => {
        redirect('https://github.com/Gauravsaini25/SnapLink---Your-URl-shortner');
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default page
