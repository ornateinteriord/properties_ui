import { jwtDecode } from "jwt-decode";

class TokenService {
  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static decodeToken(): { id: string; userid: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ id: string; userid: string }>(token);
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

  static removeToken(): void {
    localStorage.removeItem("token");
  }
}

export default TokenService;
