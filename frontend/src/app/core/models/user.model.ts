export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface User {
  id: any;
  email?: string;
  role: any;
}
