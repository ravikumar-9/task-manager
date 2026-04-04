"use client";

import { createContext, useContext, useState } from "react";
import api from "@/lib/api";
import { setToken, clearToken } from "@/lib/token";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.accessToken);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string) => {
    await api.post("/auth/register", { email, password });
  };

  const logout = async () => {
    await api.post("/auth/logout");
    clearToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};