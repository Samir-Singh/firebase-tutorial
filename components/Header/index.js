"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import Link from "next/link";

const Header = () => {
  const { authentication } = useGlobalContext();

  return (
    <div className="flex items-center gap-5 bg-gray-400 p-2 px-4 mb-2 text-white">
      {authentication.isLoggedIn ? (
        <>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact Us</Link>
          <span
            onClick={() => authentication.LogoutUser()}
            className="cursor-pointer"
          >
            Log Out
          </span>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/firestore-database">FireStore</Link>
        </>
      )}
    </div>
  );
};

export default Header;
