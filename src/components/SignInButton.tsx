// src/components/SignInButton.tsx
import { signIn } from "@/auth";
import React from "react";
import { BiCaretDown } from "react-icons/bi";

export const signInGoogle = async () => {
  "use server";
  await signIn("google", { redirectTo: "/" });
};

const SignInButton = () => {
  return (
    <div className="relative group text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
      <form action={signInGoogle}>
        <p>Hello, sign in</p>
        <button
          type="submit"
          className="text-white font-bold flex items-center"
        >
          Account & Lists <BiCaretDown />
        </button>
      </form>

      {/* Dropdown */}
      <div className="absolute top-full left-0 w-48 bg-white text-black shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Your Orders
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Your Wishlist
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Your Account
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignInButton;

