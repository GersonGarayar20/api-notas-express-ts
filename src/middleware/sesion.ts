import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/handleJwt.js";
import { UserModel } from "../models/user.model.js";

interface Payload {
	id: string;
	iat: number;
	exp: number;
}

export const validarSesion = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ").pop();
	if (!token) return res.status(404).json({ error: "no token" });

	const payload = <Payload>verificarToken(token);
	if (!payload) return res.status(404).json({ error: "token invalido" });

	const user = await UserModel.findById(payload.id);
	req.user = user;

	next();
};
