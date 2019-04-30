export interface AuthState {
  session: AuthSession | null;
};

export interface AuthSession {
  accessToken: string;
  idToken: string;
  expiresAt: number;
}