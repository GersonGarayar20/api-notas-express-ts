import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { generarToken } from "../utils/handleJwt.js";

import { compare, hash } from "bcrypt";

//registrar un usuario
export const signin = async (req: Request, res: Response) => {
	const { password, ...body } = req.body;

	const user = new UserModel({
		password: await hash(password, 10),
		...body,
	});

	await user.save();

	const token = await generarToken(user.id);

	return res.json({
		token,
		user: user.set("password"),
	});
};

//iniciar sesion
export const login = async (req: Request, res: Response) => {
	const { password, email } = req.body;

	const user = await UserModel.findOne({ email });

	if (!user)
		return res.status(404).json({ error: "contraseña o usuario incorrecto" });

	if (user.password) {
		const check = await compare(password, user?.password);
		if (!check) {
			return res.status(404).json({ error: "contraseña o usuario incorrecto" });
		}
	}

	const token = await generarToken(user.id);

	return res.json({
		token,
		user: user.set("password"),
	});
};
