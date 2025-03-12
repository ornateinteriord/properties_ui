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

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  return { isLoggedIn };
};

export default useAuth;
