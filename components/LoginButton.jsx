"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import googleLogo from "../public/google-logo.png";

export default function LogInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className=" self-center bg-white text-black px-4 py-2 text-lg font-medium flex flex-row justify-center items-center gap-2 rounded-full cursor-pointer"
    >
      <Image src={googleLogo} alt="Google Logo" width={30} height={30} />
      <p>Login</p>
    </button>
  );
}
