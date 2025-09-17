import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center gap-5 bg-gray-400 p-2 px-4 mb-2 text-white">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default Header;
