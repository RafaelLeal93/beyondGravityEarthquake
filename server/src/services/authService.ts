import jwt from "jsonwebtoken";
import { User } from "../types";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Mock user database - in production, use a real database
const users: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@earthquake-monitor.com",
    role: "ADMIN",
  },
  {
    id: "2",
    username: "viewer",
    email: "viewer@earthquake-monitor.com",
    role: "VIEWER",
  },
];

export async function authenticateUser(
  username: string,
  password: string
): Promise<User | null> {
  // In a real application, you would hash the password and compare with stored hash
  // For demo purposes, we'll accept any password
  const user = users.find((u) => u.username === username);

  if (user && password) {
    // Simple check - in production, verify password hash
    return user;
  }

  return null;
}

export function createToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null;
}
