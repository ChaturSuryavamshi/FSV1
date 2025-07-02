import React from "react";
import { useLocation, NavLink , useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut } from "lucide-react";

export default function Nav() {
  const user = "Chatur";
  const location = useLocation();
 const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-6 bg-black text-white font-mono">
      <div className="flex items-center">
        <p className="text-xl">Welcome {user}</p>
      </div>
      <nav>
        <ul className="flex space-x-8 font-mono items-center">
          {location.pathname !== "/dashboard" && (
            <>
              <li>   
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white pb-1" : "hover:border-b-2 hover:border-white pb-1"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/readings"
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white pb-1" : "hover:border-b-2 hover:border-white pb-1"
                  }
                >
                  Readings
                </NavLink>
              </li>
              <li>
                
                <NavLink
                  to="/dashboard/billing"
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white pb-1" : "hover:border-b-2 hover:border-white pb-1"
                  }
                >
                  Billing Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reports"
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white pb-1" : "hover:border-b-2 hover:border-white pb-1"
                  }
                >
                  Reports
                </NavLink>
              </li>
            </>
          )}

          <li className="cursor-pointer">
        <Popover >
        <PopoverTrigger asChild>
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
        </PopoverTrigger>
            <PopoverContent
  className="w-48 mt-2 p-0 bg-black text-white border-1 border-white rounded-md shadow-[4px_4px_0_0_rgba(5,0,0,1)]"
  align="start"
  sideOffset={5}
>
  <ul className="divide-y divide-neutral-800 text-sm font-mono">
    <li>
      <div
        className="flex items-center w-full px-4 py-3 cursor-pointer transition"
      >
        <User className="w-4 h-4 mr-2 text-gray-400" />
        Profile
      </div>
    </li>
    <li>
      <div onClick={() => navigate('/login')}
        className="flex items-center w-full px-4 py-3 cursor-pointer transition text-red-500"
      >
        <LogOut className="w-4 h-4 mr-2 text-red-500" />
        Logout
      </div>
    </li>
  </ul>
</PopoverContent>


      </Popover>
            {/* <NavLink to="/dashboard/profile"> */}
             
            {/* </NavLink> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
