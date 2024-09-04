import express, { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";

export const handlePageNotFound = (app: express.Express) => {
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		next(new NotFoundError());
	});
};
