export type UserType = 'A' | 'D' | 'S' | 'T' | 'G';

export interface User {
  serial?: number;
  name: string;
  type: UserType;
  profileimage?: string;
}
