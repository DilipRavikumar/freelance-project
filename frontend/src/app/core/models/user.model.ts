export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}
export interface User {
  id: number;
  role: Role;
}
