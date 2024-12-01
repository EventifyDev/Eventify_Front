export class TokenService {
  private static readonly TOKEN_KEY = 'access_token';

  static setToken(token: string): void {
      // Stockage dans localStorage
      localStorage.setItem(this.TOKEN_KEY, token);
      // Stockage dans un cookie sécurisé comme backup
      document.cookie = `${this.TOKEN_KEY}=${token}; path=/; secure; samesite=strict`;
  }

  static getToken(): string | null {
      // Essayer d'abord localStorage
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) return token;

      // Fallback sur les cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(c => c.trim().startsWith(`${this.TOKEN_KEY}=`));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  static clearToken(): void {
      // Nettoie localStorage
      localStorage.removeItem(this.TOKEN_KEY);
      // Nettoie le cookie
      document.cookie = `${this.TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  static isAuthenticated(): boolean {
      return !!this.getToken();
  }
}