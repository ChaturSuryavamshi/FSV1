import React, { useEffect, useState } from "react";
import Nav from "./components/nav";
import { Outlet } from "react-router-dom";

export default function Home() {
 
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto]">
      <Nav />
      <main className="p-4 bg-[#fffbeb]">
        <Outlet />
      </main>
    </div>
  );
}
