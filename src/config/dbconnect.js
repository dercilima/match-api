import mongoose from "mongoose";

async function connectDatabase() {
	mongoose.connect(process.env.DB_CONNECTION_STRING);
	
    mongoose.connection.on("error", (err) => {
		console.error(`Erro de conexão: ${err}`);
	});

	mongoose.connection.on("open", () => {
		console.log("Conexão ao MongoDB bem sucedida!");
	});
}

export default connectDatabase;
