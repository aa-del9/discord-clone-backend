import { serverSchema } from "../schemas/server.schema";
import { logger } from "../libs/logger";
import type { Request, Response } from "express";
import { createServer } from "../services/server.service";
import { randomUUID } from "crypto";

export const create = async (req: Request, res: Response) => {
    const validatedFields = serverSchema.safeParse(req.body);
    if (!validatedFields.success) {
        logger.error("SERVER -> CREATE = Invalid fields.");
        return res.status(422).send({
            success: false,
            error: { code: 422, message: "Invalid fields." },
        });
    }

    const { name, imageUrl } = validatedFields.data;
    const inviteCode = randomUUID();
    try {
        await createServer({
            name,
            imageUrl,
            creator: res.locals.user._doc._id,
            inviteCode,
        });

        logger.info("SERVER -> CREATE = Server Created Successfully.");
        return res.status(201).send({
            success: true,
            code: 201,
            message: "Your Server has been created successfully.",
        });
    } catch (err) {
        logger.error(`SERVER -> CREATE = ${(err as Error).message}`);
        return res.status(500).send({
            success: false,
            error: { code: 500, message: (err as Error).message },
        });
    }
};
