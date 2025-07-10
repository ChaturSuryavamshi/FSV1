import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {useUser} from "@/context/context"
import { useNavigate } from 'react-router-dom';  // cs changes 
import { useState } from "react"; 


export default function Login() {

  // cs changes starts  
  const [fsid, setfsId] = useState('');
  const [fspwd, setfspwd] = useState('');
  const [errors, setErrors] = useState({});
 
  const navigate = useNavigate();

    const {setUser} = useUser();
 
  const userSchema = z.object({
    userId: z.string().min(6 , 'Please enter valid ID'),
    password: z.string().min(6 , 'Password is too short')
  })

  const handleSubmit = async (e) => {
      e.preventDefault();
    const validate = userSchema.safeParse({userId:fsid , password:fspwd});
    if (!validate.success) {
      console.log(validate.data);
      const fieldErrors = {};
      validate.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);

    } else {
      setErrors({});
      // console.log("Form data", validate.data);
      const userId = validate.data.userId;
      localStorage.setItem("loggeduser", JSON.stringify(userId));
 
    }
 

  const userData = { 
                      fsid,
                      fspwd
                    };
 
  try 
  {
    const response = await fetch('https://localhost:7266/api/User/FsLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    });
 
    const data = await response.json();
 
    if (response.ok) 
    { 
      alert('User Login successfully!');
      setfsId(''); 
      setfspwd('');
      // const {fsid} = userData;3
      localStorage.setItem("JwtToken" , JSON.stringify(data.token));
        
    setUser((prev) => ({
      ...prev,
      userDeatails: data.user,
    })) 
 
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
                <div className="grid gap-3 relative">
                  <Label htmlFor="fsid">FS Id</Label>
                  {/* cs changes  */}
                  <Input id="fsid" type="text" onChange={(e) => setfsId(e.target.value)}  />  
                  {errors.userId && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.userId}</p>}

                </div>
                <div className="grid gap-3 relative">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline" >
                      Forgot your password?
                    </a>
                  </div>

                   {/* cs changes  */}
                  <Input id="fspwd" type="password" onChange={(e) => setfspwd(e.target.value)}  />
                  {errors.password && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.password}</p>}

                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4" onClick={() => navigate("/register")}>
                    Register
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
