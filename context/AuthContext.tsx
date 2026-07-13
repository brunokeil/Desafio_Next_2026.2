"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSessionUser, logout as logoutAction } from "@/app/actions/auth";

type User = {
  name: string;
  email: string;
  photo?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const sessionUser = await getSessionUser();
      if (sessionUser) {
        setUser(sessionUser);
      }
      setIsLoaded(true);
    }
    loadUser();
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    setUser(null);
    await logoutAction();
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
      // TODO: Implement server-side profile update if needed
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {isLoaded ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
