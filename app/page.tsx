"use client";
import FeaturesBento from "./_components/Bento1";
import Image from "next/image";
import { motion } from "motion/react";
import { BentoGridThirdDemo } from "./_components/BentoGridThirdDemo";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "./_components/Footer";

export default function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-slate-700 md:text-2xl lg:text-4xl dark:text-slate-300">
          {"AI-Powered Medical Agent for Smarter Conversations"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Transform the way you connect, create, and collaborate — with seamless speech-to-text, instant responses, and intelligent tools at your fingertips.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
        </motion.div>
          <div className="relative py-20 bg-white dark:bg-neutral-900">
  {/* Top Separator */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-neutral-700"></div>
  
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-14">
      🩺 <span className="text-emerald-400">Medi</span>Voice AI Features
    </h2>

    {/* Features Box */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 
                    border border-gray-200 dark:border-neutral-700 
                    rounded-3xl shadow-lg overflow-hidden bg-white dark:bg-neutral-800">
      
      <div className="p-8 flex flex-col items-center text-center space-y-4">
        <img className="rounded-full p-2" width={85} src="/doc.gif" alt="" />
        <p className="font-bold">🩺 AI Medical Consultation</p>
        <p>Talk to our intelligent AI Medical Agent anytime — instant, accurate, and human-like guidance.</p>
      </div>

      <div className="p-8 flex flex-col items-center text-center space-y-4 
                      border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-neutral-700">
        <img className="rounded-full p-2" width={95} src="/note.gif" alt="" />
        <p className="font-bold">📄 Automated Medical Reports</p>
        <p>Get easy-to-read medical reports generated automatically after your consultation.</p>
      </div>

      <div className="p-8 flex flex-col items-center text-center space-y-4 
                      border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-neutral-700">
        <img className="bg-slate-400 rounded-full p-2" width={88} src="/coin.gif" alt="" />
        <p className="font-bold">💰 Affordable & Accessible</p>
        <p>High-quality healthcare at the lowest price — available to everyone, everywhere.</p>
      </div>
    </div>
  </div>

  {/* Bottom Separator */}
  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-neutral-700"></div>
</div>


      </div>
      <FeaturesBento/>
      <Footer/>
    </div>
  );
}

const Navbar = () => {
  const user = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="" />
         <Image src='/logo.png' alt='logo' width={180} height={90}/>
      </div>
      {!user ?
      <Link href={'/sign-in'}>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      </Link>
      :
      <div className="flex item center gap-5">
        <UserButton/>
        <Link href={'/dashboard'}><Button>Dashbord</Button></Link>
      </div>
}
    </nav>
  );
};
