"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import Link from "next/link";

const Header = () => {
  const { isLoggedIn, LogoutUser } = useGlobalContext();

  return (
    <div className="flex items-center gap-5 bg-gray-400 p-2 px-4 mb-2 text-white">
      {isLoggedIn ? (
        <>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact Us</Link>
          <span onClick={() => LogoutUser()} className="cursor-pointer">
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
