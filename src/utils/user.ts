import { User } from 'src/types/user';

export const getUserDisplayText = (user: User) => {
  if (user.type === 'S') return `${user.serial || ''} ${user.name}`.trim();
  if (user.type === 'D' || user.type === 'T') return `${user.name}선생님`;
  if (user.type === 'G') return `졸업생 ${user.name}`;
  return user.name;
};

export default {};
