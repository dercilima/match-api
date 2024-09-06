import BaseError from "./base.error";

export class EmailAlreadyInUseError extends BaseError {
    constructor() {
        super(409, "O endereço de e-mail já está em uso por outra conta!");
    }
}