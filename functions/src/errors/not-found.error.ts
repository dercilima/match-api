import BaseError from "./base.error";

export class NotFoundError extends BaseError {
    constructor(message = "Página não encontrada!") {
        super(404, message);
    }
}