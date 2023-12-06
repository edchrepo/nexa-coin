import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="mt-5 flex justify-center">
      <div className="w-[80%] flex items-center justify-center space-x-2">
        <Link className="bg-[#2c2f36] px-10 py-3.5 rounded-lg" href="/">
          Coins
        </Link>
        <Link className="px-7 py-3.5 rounded-lg" href="/portfolio">
          Portfolio
        </Link>
        <div className="grow" />
        <input
          type="text"
          className="bg-[#2c2f36] p-3.5 rounded-lg"
          placeholder="Search..."
        />
        <button className="bg-[#2c2f36] p-3.5 rounded-lg">USD</button>
        <button className="bg-[#2c2f36] p-3.5 rounded-lg">LD</button>
      </div>
    </div>
  );
};

export default Navbar;
