import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginImg from "./assets/login_img.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate } from 'react-router-dom';  // cs changes 
import { useState } from "react";


export default function Login() {

  // cs changes starts  
  const [fsid, setfsId] = useState('');
  const [fspwd, setfspwd] = useState('');
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (fsid === '' || fspwd === '') {
      setError('Please fill in both fields');
      return;
  } 

  const userData = { 
                      fsid,
                      fspwd
                    };

  try 
  {
    const response = await fetch('https://localhost:7046/api/User/FsLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    });
  
    if (response.ok) 
    { 
      alert('User Login successfully!');
      setfsId(''); 
      setfspwd('');
      const {fsid} = userData;
       localStorage.setItem("loggeduser" , JSON.stringify(fsid));
      navigate('/dashboard');
    } 
    else 
    {
      const errorText = await response.text();
      alert('Login failed: ' + errorText);
    }
  } 
  catch (error) 
  {
    alert('Error connecting to the server: ' + error.message);
  }
  

};
// cs changes ends

  return (
    <div className="w-full h-full grid justify-center items-center bg-[#fffbeb]">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden w-[300px] md:w-[400px] mx-auto bg-white backdrop-blur-2xl border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-xl font-mono text-black">
          <CardContent className="grid p-0">
             {/* cs changes  */}
            <form className="p-6 md:p-8 sm:p-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className=" text-balance text-black dark:text-gray-400">
                    Login to your FS account
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="fsid">FS Id</Label>
                  {/* cs changes  */}
                  <Input id="fsid" type="text" onChange={(e) => setfsId(e.target.value)} required />  
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline" >
                      Forgot your password?
                    </a>
                  </div>

                   {/* cs changes  */}
                  <Input id="fspwd" type="password" onChange={(e) => setfspwd(e.target.value)}  required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Register
                  </a>
                </div>
              </div>
            </form>
            {/* <div className="bg-muted relative hidden md:block">
            <img
              src={LoginImg}
              alt="Image"
              className="absolute bottom-0  h-full w-full object-cover  dark:brightness-[0.2] dark:grayscale"
            />
          </div> */}
          </CardContent>
        </Card>
        {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
      </div>
    </div>
  );
}
