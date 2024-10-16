"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center pt-[60px]">
      <div className="flex justify-center items-center flex-col">
        <motion.h1
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)"
        }}
        animate={{
          opacity:1,
          scale:1,
          filter: "blur(0px)"
        }}
        transition={{
          duration: 0.45
        }}
        className="text-4xl sm:text-6xl font-bold">

          PixelMind
        </motion.h1>

        <motion.p 
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)"
        }}
        animate={{
          opacity:1,
          scale:1,
          filter: "blur(0px)"
        }}
        transition={{
          duration: 0.45
        }}className="text-center text-white/50">
          Turn text into images with our free Al-powered tool
        </motion.p>

        <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)"
        }}
        animate={{
          opacity:1,
          scale:1,
          filter: "blur(0px)"
        }}
        transition={{
          duration: 0.45, delay:0.45
        }}>
          
          <Link href={"/create"}>
            <Button
            className="mt-6 font-bold">Start Creating</Button>        
          </Link>

        </motion.div>
      </div>
    </div>
  );
}
