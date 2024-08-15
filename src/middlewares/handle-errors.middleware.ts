import express from "express";
import { InternalServerError } from "../errors/internal-server.error";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";
import { Request, Response, NextFunction } from "express";
import { FirebaseFirestoreError } from "firebase-admin/firestore";

export const handleErrors = (app: express.Express) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof FirebaseFirestoreError) {
			new ValidationError(err).send(res);
		} else if (err instanceof NotFoundError) {
			err.send(res);
		} else {
			new InternalServerError().send(res);
		}
	});
};
