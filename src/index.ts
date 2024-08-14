import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
	console.log(`Servidor escutando na porta ${PORT} ...`);
});
