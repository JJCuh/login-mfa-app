const USERS = [
  { email: 'user1@example.com', password: 'password123', role: 'read-only' },
  { email: 'admin@example.com', password: 'admin123', role: 'read-write' },
];

export function login(email, password) {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  return { email: user.email, role: user.role };
}

export function verifyMFA(code) {
  if (code !== '123456') throw new Error('Invalid MFA code');
  return true;
}

export function signup(email, password, role = 'read-only') {
  if (USERS.some(u => u.email === email)) {
    throw new Error('User already exists');
  }
  USERS.push({ email, password, role });
  return { email, role };
}
