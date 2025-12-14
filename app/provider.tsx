"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/contex/UserDetailContex";

export type UserDetail = {
  name: string;
  email: string;
  credits: number;
};

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser();

  const [created, setCreated] = useState(false);
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    // 🔑 WAIT for Clerk to load
    if (!isLoaded) return;

    // 🔑 Only run for logged-in users
    if (isSignedIn && user && !created) {
      createNewUser();
    }
  }, [isLoaded, isSignedIn, user]);

  const createNewUser = async () => {
    try {
      const res = await axios.post("/api/users", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });

      setUserDetail(res.data);
      setCreated(true);
    } catch (err) {
      console.error("User creation failed:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
