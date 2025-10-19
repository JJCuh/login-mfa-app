import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isMfaVerified, setIsMfaVerified] = useState(false);

  const loginUser = (userData) => setUser(userData);
  const verifyMfa = () => setIsMfaVerified(true);
  const logout = () => { setUser(null); setIsMfaVerified(false); };

  return (
    <AuthContext.Provider value={{ user, isMfaVerified, loginUser, verifyMfa, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
