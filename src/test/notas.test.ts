import request from "supertest";
import { app, server } from "../index.js";
import { connection } from "mongoose";
import { NoteModel } from "../models/note.model.js";
import { UserModel } from "../models/user.model.js";
const api = request(app);

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
let token: any;

describe("notes test", () => {
	//antes de todo
	beforeAll(async () => {
		await NoteModel.deleteMany();
		await UserModel.deleteMany();
	});

	//crear una nota
	test("add notes", async () => {
		const user = await api
			.post("/api/auth/signin")
			.send({ username: "test", email: "test@test.com", password: "test1234" });
		token = user.body.token;
		const response = await api
			.post("/api/notes")
			.auth(token, { type: "bearer" })
			.send({ title: "hola mundo", description: "bienvenido" });

		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toEqual(201);
		expect(response.body.title).toEqual("hola mundo");

		//revisar si se guardo en la base de datos
		const note = await NoteModel.findById(response.body._id);
		expect(note?.title).toEqual("hola mundo");
	});

	//obtener todas las notas en formato json
	test("get response json", async () => {
		return await api
			.get("/api/notes")
			.auth(token, { type: "bearer" })
			.expect(200)
			.expect("Content-type", /json/);
	});

	//actualizar una nota
	test("uptade note", async () => {
		//crear una nota para despues eliminarla
		const { body } = await api
			.post("/api/notes")
			.auth(token, { type: "bearer" })
			.send({ title: "nota a eliminar", description: "eliminar" });
		//buscar la nota por id y actulizar solo el titulo
		const response = await api
			.put(`/api/notes/${body._id}`)
			.auth(token, { type: "bearer" })
			.send({ title: "titulo actualizado" });
		expect(response.body.title).toBe("titulo actualizado");
	});

	//eliminar una nota
	test("remove note", async () => {
		//crear una nota para despues eliminarla
		const { body } = await api
			.post("/api/notes")
			.auth(token, { type: "bearer" })
			.send({ title: "nota a eliminar", description: "eliminar" });
		//eliminar nota por id
		const response = await api
			.delete(`/api/notes/${body._id}`)
			.auth(token, { type: "bearer" });
		expect(response.body.message).toBe("nota eliminada");
	});

	//buscar una nota por id que no existe
	test("find note by id", async () => {
		const response = await api
			.get("/api/notes/noexiste")
			.auth(token, { type: "bearer" });
		expect(response.status).toBe(404);
		expect(response.body.error).toBe("no se encontro la nota");
	});

	//despues de todo
	afterAll(() => {
		connection.close();
		server.close();
	});
});
