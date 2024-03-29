import type { z } from "zod";
import { ServerModel } from "../models/server.model";
import type { UpdateQuery } from "mongoose";
import { serverSchema } from "../schemas/server.schema";

export const createServer = async (payload: z.infer<typeof serverSchema>) => {
    return await ServerModel.create(payload);
};
