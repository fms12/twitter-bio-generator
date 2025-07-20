import React from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Cards({ bio }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(bio);
    toast("Bio copied to clipboard", {
      icon: "✂️",
    });
  };
  return (
    <div className="flex mt-6 w-full max-w-2xl mx-auto items-start bg-white rounded-2xl shadow-md justify-center text-center gap-4 border border-[#f4f0e6] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <svg width="16" height="96" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 8 0 
            Q 4 4.8, 8 9.6 
            T 8 19.2 
            Q 4 24, 8 28.8 
            T 8 38.4 
            Q 4 43.2, 8 48 
            T 8 57.6 
            Q 4 62.4, 8 67.2 
            T 8 76.8 
            Q 4 81.6, 8 86.4 
            T 8 96 
            L 0 96 
            L 0 0 
            Z"
          fill="#fac638"
          stroke="#fac638"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <div className="w-full">
        <p
          onClick={handleCopy}
          className="text-[#1c180d] text-base leading-relaxed font-medium mt-4 px-4"
        ></p>
        {bio}
      </div>
    </div>
  );
}
