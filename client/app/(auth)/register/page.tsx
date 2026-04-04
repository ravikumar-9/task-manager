"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { apiErrorHandler } from "@/lib/errorhandler";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      setLoading(true);
      await register(email, password);
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center items-center bg-muted p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome 👋</h1>
        <p className="text-muted-foreground text-center max-w-sm">
          Organize your work, track progress, and stay productive with your
          personal task manager.
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleRegister}>
              <Input
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                className="w-full"
                disabled={loading}
                type="submit" // ✅ FIXED
              >
                {loading ? "Creating account..." : "Register"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline hover:text-primary transition"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}