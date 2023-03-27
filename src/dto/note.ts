import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const Note = z.object({
	title: z.string(),
	description: z.string(),
});

export const validateCreateNote = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {

	try {
		req.body = Note.parse(req.body);
		next();
	} catch (err) {
		return res.status(404).json(err);
	}
	
};
