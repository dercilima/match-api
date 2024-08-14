import express from "express";
import { connectDatabase } from "./config/dbconnect";
import { routes } from "./routes";
import { handlePageNotFound } from "./middlewares/page-not-found.middleware";
import { handleErrors } from "./middlewares/handle-errors.middleware";

connectDatabase();

const app = express();
routes(app);
handlePageNotFound(app);
handleErrors(app);

export default app;