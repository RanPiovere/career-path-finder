import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

type PublicUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: PublicUser | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "cpf_users";
const CURRENT_USER_KEY = "cpf_current_user_email";

const getStoredUsers = (): StoredUser[] => {
  const raw = typeof window !== "undefined" ? window.localStorage.getItem(USERS_KEY) : null;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const setStoredUsers = (users: StoredUser[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getStoredCurrentUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_USER_KEY);
};

const setStoredCurrentUserEmail = (email: string | null) => {
  if (typeof window === "undefined") return;
  if (email) {
    window.localStorage.setItem(CURRENT_USER_KEY, email);
  } else {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
};

const toPublicUser = (user: StoredUser | null): PublicUser | null =>
  user ? { name: user.name, email: user.email } : null;

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    const users = getStoredUsers();
    const currentEmail = getStoredCurrentUserEmail();
    if (currentEmail) {
      const current = users.find((u) => u.email === currentEmail) ?? null;
      setUser(toPublicUser(current));
    }
  }, []);

  const register = (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "Пользователь с таким email уже существует" };
    }
    const nextUsers: StoredUser[] = [...users, { name, email, password }];
    setStoredUsers(nextUsers);
    setStoredCurrentUserEmail(email);
    setUser({ name, email });
    return { ok: true };
  };

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      return { ok: false, error: "Неверный email или пароль" };
    }
    setStoredCurrentUserEmail(found.email);
    setUser(toPublicUser(found));
    return { ok: true };
  };

  const logout = () => {
    setStoredCurrentUserEmail(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

