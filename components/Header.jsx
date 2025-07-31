"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Facebook, PhoneCall, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import LogInButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { status, data: session } = useSession();

  return (
    <header className="flex flex-col border-b border-b-gray-500 items-center z-50 bg-[#000000] text-white w-full py-4 sm:py-6 px-4">
      
      <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        <Link href={'/'}>
          <h1 className="text-2xl uppercase sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
            Akaltrip
          </h1>
        </Link>

        <nav className="hidden md:flex font-medium text-base lg:text-lg gap-6 lg:gap-10">
          <Link href="" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link href="" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>


        <nav className="flex md:hidden font-medium text-sm gap-4">
          <Link href="" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link href="" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>

        
        <nav className="flex gap-3 sm:gap-4">
          <Link
            className="border border-transparent rounded-full p-2 bg-blue-800 hover:bg-blue-900 transition-colors"
            href="https://www.facebook.com/profile.php?id=100092315485742"
            aria-label="Facebook"
            target="_blank"
          >
            <Facebook
              size={20}
              color="#ffffff"
              strokeWidth={1.75}
              className="sm:w-6 sm:h-6"
            />
          </Link>
          <Link
            href="https://www.instagram.com/akaltrip"
            aria-label="Instagram"
            target="_blank"
            className="border border-transparent rounded-full p-2 bg-pink-800 hover:bg-pink-900 transition-colors"
          >
            <Instagram
              size={20}
              color="#ffffff"
              strokeWidth={1.75}
              className="sm:w-6 sm:h-6"
            />
          </Link>

          {status === "authenticated" ? (
            <LogoutButton />
          ) : status === "unauthenticated" ? (
            <LogInButton />
          ) : (
            <p className=" self-center text-sm font-medium text-white">
              Loading...
            </p>
          )}
        </nav>
      </div>

      <div className="pt-3 sm:pt-4 w-full max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-10">
        <div className="flex items-center gap-1 sm:gap-2">
          <PhoneCall
            size={20}
            strokeWidth={1.75}
            className="sm:w-6 sm:h-6 flex-shrink-0"
          />
          <p className="font-semibold text-sm sm:text-base">+212 661-604747</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Mail
            size={20}
            strokeWidth={1.75}
            className="sm:w-6 sm:h-6 flex-shrink-0"
          />
          <p className="font-semibold text-sm sm:text-base break-all sm:break-normal">
            contact@akaltrip.com
          </p>
        </div>
      </div>
    </header>
  );
}
