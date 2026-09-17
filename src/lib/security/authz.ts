import { UserRole } from '../../contexts/UserContext';

export function isAuthorized(activeRole: UserRole, requiredRole: UserRole): boolean {
  // Define a hierarchy or simple check
  const roles = ['visiteur', 'client', 'employer', 'admin'];
  const activeIdx = roles.indexOf(activeRole);
  const requiredIdx = roles.indexOf(requiredRole);

  if (activeIdx === -1 || requiredIdx === -1) return false;
  return activeIdx >= requiredIdx;
}
