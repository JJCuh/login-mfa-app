import { useAuth } from "../context/AuthContext";

export default function RoleBasedActions() {
  const { user } = useAuth();
  if (user?.role === 'read-write') {
    return <button data-cy="edit-action">Edit Content</button>;
  }
  return <p data-cy="read-only-msg">You have read-only access.</p>;
}
