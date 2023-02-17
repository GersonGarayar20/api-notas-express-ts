import { connect } from "mongoose";

export const DBConnect = () => {
	const { NODE_ENV, DB_URI, DB_URI_TEST } = process.env;

	const connectionString = NODE_ENV === "test" ? DB_URI_TEST : DB_URI;

	const uri = connectionString || "";

	connect(uri)
		.then(() => {
			console.log("**** CONEXION CORRECTA ****");
		})
		.catch(() => {
			console.log("**** ERROR DE CONEXION ****");
		});
};
