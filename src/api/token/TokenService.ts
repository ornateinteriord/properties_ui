import { jwtDecode } from "jwt-decode";

class TokenService {
  static setToken(token: string): void {
    sessionStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  static decodeToken(): { id: string; userid: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ id: string; userid: string; role: string; exp: number }>(token);
      // Check if the token is expired
      if (decoded.exp * 1000 < Date.now()) {
        this.removeToken();  // Remove the expired token
        return null;
      }

      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  static getuserId(): string | null {
    return this.decodeToken()?.userid || null;
  }

  static getId(): string | null {
    return this.decodeToken()?.id || null;
  }

  
  static getRole(): string | null {
    return this.decodeToken()?.role || null;
  }

  static removeToken(): void {
    sessionStorage.removeItem("token");
  }
}

export default TokenService;
