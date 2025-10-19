import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("read-only");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      signup(email, password, role);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="read-only">Read-Only</option>
          <option value="read-write">Read/Write</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
