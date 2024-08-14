import { Error } from "mongoose";
import BaseError from "./base.error";

export class ValidationError extends BaseError {
	constructor(err: Error.ValidationError) {
		const messages = Object.values(err.errors)
			.map((erro) => erro.message)
			.join("; ");
		super(400, `Erro de validação de dados: ${messages}`);
	}
}
