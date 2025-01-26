import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { auth } from "@/config/firebase_config"
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from "react";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
const [email,setEmail]=useState<string> ("");
const[password ,setPassword ]=useState("");
const[error,setError]= useState("")
  
const handlelogin=async(e:React.FormEvent)=>{
  e.preventDefault()
  setError("")
try {
  await signInWithEmailAndPassword(auth,email,password);
  alert("Login successful!");

} catch (error) {
  if( error instanceof Error){
    setError(error.message)
  }else{
    setError("An unknown error occurred")
  }
}

}


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlelogin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-red-500"  >{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <Button   type="submit" className="w-full">
                Login
              </Button>
              <Button  type="submit" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
