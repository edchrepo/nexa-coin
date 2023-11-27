import React from "react";

const Navbar = () => {
  return (
    <div className="mt-5 flex justify-center">
      <div className="w-[80%] flex items-center space-x-2">
        <button className="bg-[#2c2f36] px-10 py-3.5 rounded-lg">Coins</button>
        <button className="px-7 py-3.5 rounded-lg">Portfolio</button>
        <div className="grow" />
        <input
          type="text"
          className="bg-[#2c2f36] p-3.5 rounded-lg"
          placeholder="Search..."
        />
        <button className="bg-[#2c2f36] p-3.5 rounded-lg">USD</button>
        <button className="bg-[#2c2f36] p-3.5 rounded-lg">L | D</button>
      </div>
    </div>
  );
};

export default Navbar;
