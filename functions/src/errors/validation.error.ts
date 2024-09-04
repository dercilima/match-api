import BaseError from "./base.error";

export class ValidationError extends BaseError {
	constructor() {
		super(400, `Dados inválidos!`);
	}
}
