"use client";

import { createContext, useContext, useState } from "react";
import api from "@/lib/api";
import { setToken, clearToken } from "@/lib/token";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { apiErrorHandler } from "@/lib/errorhandler";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.accessToken);
      setIsAuthenticated(true);
      toast.success(res.data.message || "Login successful!");
      router.replace("/");
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response=await api.post("/auth/register", { email, password });
      toast.success(response?.data?.message || "Registration successful! Please log in.");
      router.push("/login");
    }
    catch (error) {
      apiErrorHandler(error);
    }
      finally {
        setIsLoading(false);
      }
  };

  const logout = async () => {
    try{
    const response = await api.post("/auth/logout");
    clearToken();
    setIsAuthenticated(false);
    toast.success(response.data.message || "Logged out successfully");
    router.replace("/login");
    }
    catch(error){
      apiErrorHandler(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
