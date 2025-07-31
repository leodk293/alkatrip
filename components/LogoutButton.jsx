"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className=" self-center bg-blue-950 text-white px-4 py-2 text-lg font-medium flex flex-row justify-center items-center gap-2 rounded-full cursor-pointer"
    >
      <LogOut />
      <p>Logout</p>
    </button>
  );
}
