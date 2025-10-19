import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const user = login(email, password);
      loginUser(user);
      navigate("/mfa");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input name="password" type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
