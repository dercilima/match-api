import express from "express";
import { InternalServerError } from "../errors/internal-server.error";
import { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import BaseError from "../errors/base.error";

export const handleErrors = (app: express.Express) => {
	app.use(errors());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof BaseError) {
			err.send(res);
		} else {
			console.log(err);
			new InternalServerError().send(res);
		}
	});
};
