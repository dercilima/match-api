import BaseError from "./base.error";

export class Unauthorized extends BaseError {
	constructor(message = "Não autorizado") {
		super(401, message);
	}
}
