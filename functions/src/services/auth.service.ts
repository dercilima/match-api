import { FirebaseAuthError, getAuth as getAdminAuth, UpdateRequest } from "firebase-admin/auth";
import { User } from "../models/user.model";
import { UserRecord } from "firebase-functions/v1/auth";
import {
	signInWithEmailAndPassword,
	UserCredential,
	getAuth as getFirebaseAuth,
} from "firebase/auth";

export class AuthService {
	async create(user: User): Promise<UserRecord> {
		return await getAdminAuth()
			.createUser({
				email: user.email,
				password: user.password,
				displayName: user.nome,
			})
	}
}
