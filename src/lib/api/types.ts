export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
