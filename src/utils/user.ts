import { UserType } from 'src/types/user';

export interface User {
  serial?: number;
  name: string;
  type: UserType;
}

export const getUserDisplayText = (user: User) => {
  if (user.type === 'S') return `${user.serial || ''} ${user.name}`.trim();
  if (user.type === 'D' || user.type === 'T') return `${user.name}선생님`;
  if (user.type === 'G') return `졸업생 ${user.name}`;
  return user.name;
};

export default {};
