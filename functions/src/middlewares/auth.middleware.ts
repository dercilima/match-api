import express, { NextFunction, Response } from "express";
import { Request } from "express";
import { Unauthorized } from "../errors/unauthorized.error";
import { getAuth } from "firebase-admin/auth";
import { UsersService } from "../services/users.service";
import { ForbiddenError } from "../errors/forbidden.error";

export const auth = (app: express.Express) => {
	app.use(async (req: Request, res: Response, next: NextFunction) => {
		if (req.method === "POST" && req.url.endsWith("/auth/login")) {
			return next();
		}

		const token = req.headers.authorization?.split("Bearer ")[1];

		if (token) {
			const decodedIdToken = await getAuth()
				.verifyIdToken(token, true)
				.catch((error) => {
					console.log(error);
					next(new Unauthorized());
				});

		}
		return next(new Unauthorized());
	});
};
