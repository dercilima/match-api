import BaseError from "./base.error";

export class BadRequestError extends BaseError {
    constructor() {
        super(400, "Os dados fornecidos estão inválidos!");
    }
}