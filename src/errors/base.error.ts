import { Response } from "express";

export default class BaseError extends Error {
	public status: number;

	constructor(status: number, message: string) {
		super();
		this.status = status;
		this.message = message;
	}

	send(res: Response) {
		res.status(this.status).send({
			status: this.status,
			message: this.message,
		});
	}
}
