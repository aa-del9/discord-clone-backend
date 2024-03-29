import {
    type Secret,
    type SignOptions,
    type JwtPayload,
    sign,
    verify,
} from "jsonwebtoken";
import { config } from "../config/environtments";
import type { Response } from "express";

export const generateAccessToken = (
    payload: Record<string, unknown>,
    options?: SignOptions,
) => {
    return sign(payload, config.jwtSecret as Secret, {
        ...options,
        algorithm: "HS256",
    });
};

export const verifyToken = <T = string | JwtPayload>(token: string) => {
    try {
        const decoded = verify(token, config.jwtSecret as Secret);
        return {
            valid: true,
            expired: false,
            decoded: decoded as T,
        };
    } catch (err) {
        return {
            valid: false,
            expired:
                (err as Error).message ===
                "jwt is expired or not eligible to use",
            decoded: null,
        };
    }
};

export const createAccessToken = (
    res: Response,
    payload: Record<string, unknown>,
) => {
    const accessToken = generateAccessToken(payload, { expiresIn: "1d" });
    const expires = new Date(new Date().setDate(new Date().getDate() + 1));
    return res.cookie("accessToken", accessToken, {
        expires,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
    });
};
