import { useAuth } from "../context/AuthContext";
import RoleBasedActions from "../components/RoleBasedActions";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="dashboard">
      <h2>Welcome, {user?.email}</h2>
      <p>Role: {user?.role}</p>
      <RoleBasedActions />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
