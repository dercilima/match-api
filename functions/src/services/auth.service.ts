import { FirebaseAuthError, getAuth as getAdminAuth, UpdateRequest } from "firebase-admin/auth";
import { User } from "../models/user.model";
import { EmailAlreadyInUseError } from "../errors/email-already-in-use.error";
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
			.catch((err) => {
				if (err instanceof FirebaseAuthError) {
					if (err.code === "auth/email-already-exists") {
						throw new EmailAlreadyInUseError();
					}
				}
				throw err;
			});
	}

	async update(id: string, user: User) {
		const props: UpdateRequest = {
			email: user.email,
			displayName: user.nome,
		};

		if (user.password) {
			props.password = user.password;
		}

		await getAdminAuth().updateUser(id, props);
	}

	async delete(uid: string) {
		await getAdminAuth().deleteUser(uid);
	}

	async login(email: string, password: string): Promise<UserCredential> {
		return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
	}
}
