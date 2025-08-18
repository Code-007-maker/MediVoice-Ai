"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { number } from 'motion/react';
import { UserDetailContext } from '@/contex/UserDetailContex';

export type UserDetail = {
    name : string,
    email : string ,
    credits : number
}

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser(); 
  const [created, setCreated] = useState(false);
  const [userDetail , setuserdetail] = useState<any>();

  useEffect(() => {
    if (user && !created) {
      CreateNewUser();
    }
  }, [user]);

 const CreateNewUser = async () => {
  try {
    const res = await axios.post('/api/users', {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(res.data);
    setuserdetail(res.data);
    setCreated(true);
  } catch (err) {
    console.error("User creation failed:", err);
  }
};


  return( 
     <>
     <UserDetailContext.Provider value = {{userDetail , setuserdetail}}>
     {children}
     </UserDetailContext.Provider>
     </>
  )
}

export default Provider;
