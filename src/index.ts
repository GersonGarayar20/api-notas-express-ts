import { config } from "dotenv";
import { DBConnect } from "./config/mongo.js";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

config();
DBConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});

export { app, server };