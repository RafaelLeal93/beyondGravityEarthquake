import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_MUTATION, ME_QUERY } from "../graphql/queries";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    data: meData,
    loading: meLoading,
    refetch,
  } = useQuery(ME_QUERY, {
    skip: !localStorage.getItem("token"),
    onError: () => {
      localStorage.removeItem("token");
      setUser(null);
    },
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (meData?.me) {
      setUser(meData.me);
    }
    setLoading(meLoading);
  }, [meData, meLoading]);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });

      if (data?.login?.token) {
        localStorage.setItem("token", data.login.token);
        setUser(data.login.user);
        await refetch();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
