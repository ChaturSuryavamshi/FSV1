

import React from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "@/context/context";

export default function reading() {

  const {user} = useUser();
  
  const navigate = useNavigate();
 
  console.log(user);

  return (
    <div>
      <div className="grid grid-cols-3 p-8 gap-6">
        <div onClick={() => navigate('/dashboard/closing-opening-readings')} className="cursor-pointer bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-mono">
            Submit Opening / Closing Readings
          </h3>
         
        </div>
        <div onClick={() => navigate('/dashboard/submitted-readings')} className="cursor-pointer bg-white border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-mono">
            View Submitted Readings
          </h3>
         
        </div>
        
      </div>
    </div>
  );
}
