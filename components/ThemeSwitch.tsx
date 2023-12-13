"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import * as Icons from "../icons";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="flex items-center bg-[#181825] border border-border rounded-xl p-2 h-10"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Image className="h-5 w-5" src={Icons.Dark} alt="Dark" />
      ) : (
        <Image className="h-5 w-5" src={Icons.Light} alt="Light" />
      )}
    </button>
  );
}
