import {initializeApp} from "firebase-admin/app";
import app from "./app";

initializeApp();

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
	console.log(`Servidor escutando na porta ${PORT} ...`);
});
