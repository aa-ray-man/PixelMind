"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { signIn, signOut, useSession } from 'next-auth/react';
import { BiLoaderCircle } from "react-icons/bi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
  

export default function Header() {
    const [initialLoading, setInitialLoading] = useState<boolean>(true)
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status !== "loading") {
            setInitialLoading(false);
        }
    }, [status, session])
    return (
        <div className='fixed top-0 w-full max-w-screen-xl mx-auto h-[60px] bg-black border-b border-white/60 p-3 flex justify-between items-center z-50'>
            <Link href='/'>
                <h2 className='ml-7 font-bold text-xl'> PixelMind </h2>
            </Link>

            <div className='mr-7'>
                {initialLoading && status === "loading" ? <BiLoaderCircle className='animate-spin' /> : !session ? (
                    <div className="__menu">
                        <Button onClick={() => signIn("google")}>Login</Button>
                    </div>) : (
                    <div className='flex gap-3 justify-center items-center'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={session.user?.image || ""} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <FaRegUser />
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={()=>signOut()}>
                                    <MdLogout />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>

        </div>
    )
}
