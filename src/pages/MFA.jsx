import { useState } from "react";
import { verifyMFA } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MFA() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { verifyMfa } = useAuth();

  const handleVerify = (e) => {
    e.preventDefault();
    try {
      verifyMFA(otp);
      verifyMfa();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Multi-Factor Authentication</h2>
      <form onSubmit={handleVerify}>
        <input name="otp" type="text" placeholder="Enter 6-digit code"
          value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
