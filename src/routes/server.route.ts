import { Router } from "express";
import { requireUser } from "../middlewares/auth.middleware";
import { create } from "../controllers/server.controller";

export const ServerRouter: Router = Router();

ServerRouter.post("/create", requireUser, create);
