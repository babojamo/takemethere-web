import { User } from '../types/users';

export const AUTH_TOKEN_KEY_NAME = 'AuthToken';
const AUTH_USER_KEY_NAME = 'AuthUser';

class TokenService {
  getRefreshToken(): string | null {
    const user = this.getAuthUser();
    return user?.refreshToken || null;
  }

  getAuthToken(): string | null | undefined {
    return localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }

  getAuthUser(): User | null {
    const userJSONStr = localStorage.getItem(AUTH_USER_KEY_NAME);
    return userJSONStr ? JSON.parse(userJSONStr) : null;
  }

  setAuthUser(user: User): void {
    localStorage.setItem(AUTH_USER_KEY_NAME, JSON.stringify(user));
  }

  removeAuthUser(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
    localStorage.removeItem(AUTH_USER_KEY_NAME);
  }
}

export default new TokenService();
