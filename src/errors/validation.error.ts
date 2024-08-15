import { FirebaseFirestoreError } from "firebase-admin/firestore";
import BaseError from "./base.error";

export class ValidationError extends BaseError {
	constructor(err: FirebaseFirestoreError) {
		super(400, `Erro do banco de dados: ${err.message}`);
	}
}
