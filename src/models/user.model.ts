import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

export const UserModel = model("user", UserSchema);
