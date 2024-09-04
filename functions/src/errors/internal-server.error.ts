import BaseError from "./base.error";

export class InternalServerError extends BaseError {
	constructor(status = 500, message = "Erro interno do servidor!") {
		super(status, message);
	}
}
