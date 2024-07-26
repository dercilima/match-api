import mongoose from "mongoose";
import { InternalServerError } from "../errors/internal-server.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { BadRequestError } from "../errors/bad-request.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

const handleError = (app) => {
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		if (err instanceof mongoose.Error.CastError) {
			new BadRequestError().send(res);
		} else if (err instanceof mongoose.Error.ValidationError) {
			new ValidationError(err).send(res);
		} else if (err instanceof NotFoundError) {
			err.send(res);
		} else {
			new InternalServerError().send(res);
		}
	});
};

export default handleError;
