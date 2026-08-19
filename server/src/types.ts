export type AuthProvider = 'local' | 'google';

export type DbUser = {
  Id: string;
  Email: string;
  PasswordHash: string | null;
  FullName: string | null;
  AvatarUrl: string | null;
  Provider: AuthProvider;
  EmailVerified: boolean;
  IsActive?: boolean;
};

export type PublicUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  provider: AuthProvider;
  emailVerified: boolean;
};

export type AuthenticatedRequestUser = {
  id: string;
  email: string;
};
