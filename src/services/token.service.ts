import Cookies from 'js-cookie';

export class TokenService {
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';

  static getToken(): string | null {
    // For browser environments, prefer cookies
    const cookieToken = Cookies.get('Authentication');
    if (cookieToken) {
      return cookieToken;
    }
    
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    const cookieRefreshToken = Cookies.get('Refresh');
    if (cookieRefreshToken) {
      return cookieRefreshToken;
    }
    
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static setToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}