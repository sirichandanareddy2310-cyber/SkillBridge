import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sb_token");

    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .fetchCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("sb_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await authApi.login(email, password);

    localStorage.setItem("sb_token", "mock-token");
    setUser(data);
  }

  async function signup(payload) {
    const data = await authApi.signup(payload);

    localStorage.setItem("sb_token", "mock-token");
    setUser(data);
  }

  function logout() {
    localStorage.removeItem("sb_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}