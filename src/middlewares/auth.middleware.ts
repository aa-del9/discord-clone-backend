import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../libs/jwt";
import { logger } from "../libs/logger";

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const user = res.locals.user;
   if (!user) {
      res.clearCookie("accessToken", { httpOnly: true });
      logger.error("AUTH -> REQUIRE_USER = Access Denied.");
      return res.status(403).send({ success: false, error: { code: 403, message: "Access Denied." } });
    }

   next();
  } catch (err) {
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

// Token
export const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
 const accessToken: string | undefined = req.cookies.accessToken;
  if (!accessToken) {
    return next();
  }

  const token = verifyToken(accessToken);
  if (token.expired) {
    return next();
  }

 if (token.decoded) {
    res.locals.user = token.decoded;
    return next();
  }

  next();
};
