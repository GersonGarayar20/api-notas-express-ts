import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const NoteModel = model("note", NoteSchema);
