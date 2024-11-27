export class TokenService {
    private static readonly TOKEN_KEY = 'access_token';
    private static memoryStorage: { [key: string]: string } = {};
  
    static setToken(token: string): void {
      // Stockage en mémoire uniquement
      this.memoryStorage[this.TOKEN_KEY] = token;
  
      // Optionnel : Stockage dans un cookie sécurisé
      document.cookie = `${this.TOKEN_KEY}=${token}; path=/; secure; samesite=strict`;
    }
  
    static getToken(): string | null {
      return this.memoryStorage[this.TOKEN_KEY] || null;
    }
  
    static clearToken(): void {
      // Nettoie la mémoire
      delete this.memoryStorage[this.TOKEN_KEY];
  
      // Nettoie le cookie si utilisé
      document.cookie = `${this.TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  
    static isAuthenticated(): boolean {
      return !!this.getToken();
    }
  }