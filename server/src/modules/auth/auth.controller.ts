import { Request, Response } from "express";
import { db } from "../../db/index";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { refreshTokens } from "../../db/schema";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await db.select().from(users).where(eq(users?.email, email));
    if (!user || user?.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid =await comparePassword(password, user[0]?.password as string);
      
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const accessToken = await generateAccessToken(user[0]?.id);
    const refreshToken = await generateRefreshToken(user[0]?.id);
    await db.insert(refreshTokens).values({
      token: refreshToken,
      userId: user[0]?.id,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users?.email, email));
    if (userExists?.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword =await hashPassword(password);
    const newUser = await db
      .insert(users)
      .values({
        email: email as string,
        password: hashedPassword as unknown as string,
      })
      .returning();
    res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshToken));
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tokenRecord = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, refreshToken));
    if (!tokenRecord || tokenRecord?.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verify = verifyRefreshToken(refreshToken);
    if (!verify) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = await generateAccessToken(tokenRecord[0]?.userId);
    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
