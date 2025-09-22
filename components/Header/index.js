"use client";

import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalProvider";

const Header = () => {
  const { auth, clearAuth } = useGlobalContext();

  return (
    <div className="flex items-center gap-5 bg-gray-400 p-2 px-4 mb-2 text-white">
      {auth ? (
        <>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact Us</Link>
          <span onClick={() => clearAuth()} className="cursor-pointer">
            Log Out
          </span>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Header;
