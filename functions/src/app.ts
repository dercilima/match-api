import express from "express";
import { routes } from "./routes";
import { handlePageNotFound } from "./middlewares/page-not-found.middleware";
import { handleErrors } from "./middlewares/handle-errors.middleware";
import { auth } from "./middlewares/auth.middleware";

export const app = express();
auth(app);
routes(app);
handlePageNotFound(app);
handleErrors(app);