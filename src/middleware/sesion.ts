import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/handleJwt.js";
import { UserModel } from "../models/user.model.js";

export const validarSesion = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

	//obtener token
	const token = req.headers.authorization?.split(" ").pop();
	if (!token) return res.status(401).json({ error: "no token" });

	//verificar token
	const payload:any = verificarToken(token)
	if (!payload) return res.status(401).json({ error: "token invalido" });

	//inyectar usuario
	const user = await UserModel.findById(payload.id);
	req.user = user;

	next();
	
};
