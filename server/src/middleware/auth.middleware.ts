import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: any;
}

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token expired" });
  }
};