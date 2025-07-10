import React, { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';  

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {useUser} from './context/context'

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  type: z.string().min(1, "Type is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(10, "Phone must be 10 digits").max(10),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  oname: z.string().min(1, "Owner name is required"),
  ophone: z.string().min(10, "Owner phone must be 10 digits").max(10),
  oemail: z.string().email("Invalid owner email address"),
});

export default function Register() {
  const navigate = useNavigate();

  const {setUser} = useUser();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "",
    location: "",
    phone: "",
    email: "",
    password: "",
    oname: "",
    ophone: "",
    oemail: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
 
    /// commented by cs 07062025
    // setUser((prev) => ({
    //   ...prev,
    //   userDeatails: setUser,
    // }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(formData);

    if (!result.success) 
    {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      console.log(formData);

    } 
    else 
    {
      setErrors({});
      console.log("✅ Form is valid!", result.data);

      const userData = {
          //fsid: result.data.type + '_' + result.data.location + '0044',
          fsname: result.data.name,
          fsaddr: result.data.address,
          fsoptype: result.data.type,
          fslocdis: result.data.location,
          fsphno: result.data.phone,
          fsemailid: result.data.email,
          fspwd: result.data.password,
          fsownname: result.data.oname,
          fsownemail: result.data.oemail,
          fsownmobno: result.data.ophone
      };
      
      console.log(userData);
 
      try {
              const response = await fetch('https://localhost:7266/api/User/FsRegister', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userData)
              });

              const data = await response.json();
              
              if (response.ok) {
              
                  console.log("User registered successfully with fsid:", data.fsid);

                  alert("User registered successfully Id : " + data.fsid);

                  // Redirect to login page
                  navigate('/login');
              
              } 
              else {
                  console.error("Error:", data);
              }
          } 
          catch (error) {
          console.error("Network error:", error);
          }
 
    }
  };

  return (
    <div className="w-full h-full grid justify-center items-center bg-[#fffbeb]">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden lg:w-[50vw] md:w-[60vw] sm:w-[80vw] mx-auto bg-white backdrop-blur-2xl border-4 border-black p-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-xl font-mono text-black">
          <CardContent className="grid p-0">
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Register User</h1>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="grid gap-3 relative">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.name}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                    {errors.address && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.address}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label>Choose Type</Label>
                    <Select onValueChange={(val) => handleChange("type", val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="HPCL">HPCL</SelectItem>
                          <SelectItem value="BPCL">BPCL</SelectItem>
                          <SelectItem value="JPCL">JPCL</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.type}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label>Choose Location</Label>
                    <Select onValueChange={(val) => handleChange("location", val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="MYS">MYS</SelectItem>
                          <SelectItem value="BNG">BNG</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.location && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.location}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="pnumber">Phone Number</Label>
                    <Input
                      id="pnumber"
                      type="number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.phone}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.email}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.password}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="oname">Owner Name</Label>
                    <Input
                      id="oname"
                      type="text"
                      value={formData.oname}
                      onChange={(e) => handleChange("oname", e.target.value)}
                    />
                    {errors.oname && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.oname}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="opnumber">Owner Phone Number</Label>
                    <Input
                      id="opnumber"
                      type="number"
                      value={formData.ophone}
                      onChange={(e) => handleChange("ophone", e.target.value)}
                    />
                    {errors.ophone && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.ophone}</p>}
                  </div>

                  <div className="grid gap-3 relative ">
                    <Label htmlFor="oemail">Owner Email</Label>
                    <Input
                      id="oemail"
                      type="email"
                      value={formData.oemail}
                      onChange={(e) => handleChange("oemail", e.target.value)}
                    />
                    {errors.oemail && <p className="text-red-500 text-xs absolute bottom-[-1.2rem]">{errors.oemail}</p>}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>

                <div className="text-center text-sm">
                  Have an account?{" "}
                  <a href="#" onClick={() => navigate("/login")} className="underline underline-offset-4">
                    Login
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
