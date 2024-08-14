import mongoose, { Error } from "mongoose";

export function connectDatabase() {
	mongoose.connect(process.env.DB_CONNECTION_STRING!)
	.then(() => {
		console.log("Conectado no Mongo Atlas")
	})
	.catch((err: Error) => {
		console.log(err);
	});

	mongoose.connection.on("error", (err) => {
		console.error(`Erro de conexão: ${err}`);
	});

	mongoose.connection.on("open", () => {
		console.log("Conexão ao MongoDB bem sucedida!");
	});
}
