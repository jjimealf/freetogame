import { Timestamp } from 'firebase/firestore';

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  secondName: string;
  displayName: string;
  role: UserRole;
  active: boolean;
  deleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RegisterInput {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}
