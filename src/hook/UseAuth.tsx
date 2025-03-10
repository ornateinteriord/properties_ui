import { useEffect, useState } from "react";
import TokenService from "../api/token/TokenService";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!TokenService.getToken()
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const token = TokenService.getToken();
      setIsLoggedIn(!!token);
    };

    // Update state on render
    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () =>{
    TokenService.removeToken()
    setIsLoggedIn(false)
    window.location.href = "/signin";
  }

  return { isLoggedIn,logout };
};

export default useAuth;
