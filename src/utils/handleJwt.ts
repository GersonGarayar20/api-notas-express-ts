import jwt from "jsonwebtoken";

export const generarToken = async (id: string) => {
	const JWT_SECRET = process.env.JWT_SECRET!

	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: "2h",
	});
};

export const verificarToken = (token: string) => {
	try {
		const JWT_SECRET = process.env.JWT_SECRET!
		return jwt.verify(token, JWT_SECRET);
	} catch (err) {
		return null;
	}
};
