import { Schema, model } from "mongoose";

const serverSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 4,
            max: 24,
        },
        imageUrl: {
            type: String,
        },

        inviteCode: {
            type: String,
            unique: true,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

export const ServerModel = model("Server", serverSchema);
