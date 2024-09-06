import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { AuthService } from "./auth.service";

export class UsersService {
	readonly collection = getFirestore().collection("users");
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	async add(user: User) {
		const authUser = await this.authService.create(user);
		delete user.password;
		await this.collection.doc(authUser.uid).set(user);
	}

	async update(id: string, user: User) {
		const docRef = this.collection.doc(id);
		if (!(await docRef.get()).exists) {
			throw new NotFoundError("Usuário não encontrado!");
		}
		await this.authService.update(id, user);
		await docRef.update({ ...user });
	}

	async findAll(): Promise<User[]> {
		const snapshot = await this.collection.get();
		return snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			} as User;
		});
	}

	async findById(id: string): Promise<User> {
		const snapshot = await this.collection.doc(id).get();
		if (snapshot.exists) {
			return {
				id: snapshot.id,
				...snapshot.data(),
			} as User;
		} else {
			throw new NotFoundError("Usuário não encontrado!");
		}
	}

	async delete(id: string): Promise<void> {
		if (!(await this.collection.doc(id).get()).exists) {
			throw new NotFoundError("Usuário não encontrado!");
		}
		await this.authService.delete(id);
		await this.collection.doc(id).delete();
	}
}
