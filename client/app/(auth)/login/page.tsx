"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
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

export default function Login() {
  const { login,isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center items-center bg-muted p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome back 👋</h1>
        <p className="text-muted-foreground text-center max-w-sm">
          Pick up where you left off. Your tasks are waiting.
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <Input
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="flex justify-between text-sm text-muted-foreground">
                <Link
                  href="/forgot-password"
                  className="hover:underline"
                >
                  Forgot password?
                </Link>

                <Link
                  href="/register"
                  className="underline hover:text-primary transition"
                >
                  Register
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}