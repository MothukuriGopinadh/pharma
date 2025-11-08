import React, { createContext, useContext, useState } from "react";

export type Role =
  | "Ingredient Supplier"
  | "Manufacturer"
  | "Repackage"
  | "Distributor"
  | "Pharmacy"
  | "FDA";

interface AuthContextType {
  currentRole: Role | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const STORAGE_KEY = "pharmachain:role";
  const [currentRole, setCurrentRole] = useState<Role | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (raw as Role) : null;
    } catch {
      return null;
    }
  });

  const loginAs = (role: Role) => {
    setCurrentRole(role);
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {}
  };

  const logout = () => {
    setCurrentRole(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ currentRole, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const ALL_ROLES: Role[] = [
  "Ingredient Supplier",
  "Manufacturer",
  "Repackage",
  "Distributor",
  "Pharmacy",
  "FDA",
];
