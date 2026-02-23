import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return { token, refreshToken, user };
  });

  useEffect(() => {
    if (authState.token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${authState.token}`;
    } else {
      delete apiClient.defaults.headers.common.Authorization;
    }
  }, [authState.token]);

  const login = async ({ email, password }) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    const next = { token: data.accessToken, refreshToken: data.refreshToken, user: data.user };
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuthState(next);
  };

  const logout = async () => {
    try {
      if (authState.refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken: authState.refreshToken });
      }
    } catch (error) {
      // no-op logout fallback
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAuthState({ token: null, refreshToken: null, user: null });
  };

  const value = useMemo(
    () => ({
      ...authState,
      isAuthenticated: Boolean(authState.token),
      login,
      logout
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
