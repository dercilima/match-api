import express from "express";
import connectDatabase from "./config/dbconnect.js";
import createRoutes from "./routes/index.js";
import handleError from "./middlewares/handle-errors.middleware.js";
import handlePageNotFound from "./middlewares/page-not-found.middleware.js";

await connectDatabase();

const app = express();
createRoutes(app);
handlePageNotFound(app);
handleError(app);

export default app;