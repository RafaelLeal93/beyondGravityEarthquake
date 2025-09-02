import { Request, Response, NextFunction } from "express";
import { verifyToken, getUserById } from "../services/authService";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // For GraphQL, we'll handle authentication in the context
    return next();
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  const decoded = verifyToken(token);

  if (decoded) {
    const user = getUserById(decoded.userId);
    if (user) {
      req.user = user;
    }
  }

  next();
}
