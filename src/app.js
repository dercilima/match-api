import express from "express";
import connectDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js"

const database = await connectDatabase();

database.on("error", (err) => {
    console.error(`Erro de conexão: ${err}`);
});

database.on("open", () => {
    console.log("Conexão ao MongoDB bem sucedida!");
});

const app = express();
routes(app);

export default app;