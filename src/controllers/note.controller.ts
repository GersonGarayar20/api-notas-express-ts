import { Request, Response } from "express";
import { NoteModel } from "../models/note.model.js";

//buscar todas las notas
const findAll = (req: Request, res: Response) => {
	const user = req.user.id;

	NoteModel.find({ user }).then((data) => res.json(data));
};

//buscar una nota
const findOne = (req: Request, res: Response) => {
	const _id = req.params.id;
	const user = req.user.id;

	NoteModel.findOne({ _id, user })
		.then((data) => {
			return res.json(data);
		})
		.catch((err) => {
			return res.status(404).json({ error: "no se encontro la nota" });
		});
};

//crear una nota
const create = (req: Request, res: Response) => {
	const note = new NoteModel({
		user: req.user.id,
		...req.body,
	});

	note.save().then((data) => {
		return res.status(201).json(data);
	});
};

//eliminar una nota
const remove = (req: Request, res: Response) => {
	const _id = req.params.id;
	const user = req.user.id;

	NoteModel.findOneAndDelete({ _id, user })
		.then((data) => {
			return res.json({ message: "nota eliminada" });
		})
		.catch((err) => {
			return res.status(404).json({ error: "no se encontro la nota" });
		});
};

//actulizar una nota
const update = (req: Request, res: Response) => {
	const _id = req.params.id;
	const user = req.user.id;

	NoteModel.findOneAndUpdate({ _id, user }, req.body, { new: true })
		.then((data) => {
			return res.json(data);
		})
		.catch((err) => {
			return res.status(404).json({ error: "no se encontro la nota" });
		});
};

export default {
	findAll,
	findOne,
	create,
	remove,
	update,
};
