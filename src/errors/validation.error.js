import BaseError from "./base.error.js";

export class ValidationError extends BaseError {
    constructor(err) {
        const messages = Object.values(err.errors)
				.map((erro) => erro.message)
				.join("; ");
        super(400, `Erro de validação de dados: ${messages}`);
    }
}