import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const UserSignin = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export const validateUserSignin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body = UserSignin.parse(req.body);
		next();
	} catch (err) {
		return res.status(404).json(err);
	}
};

const UserLogin = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const validateUserLogin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body = UserLogin.parse(req.body);
		next();
	} catch (err) {
		return res.status(404).json(err);
	}
};
