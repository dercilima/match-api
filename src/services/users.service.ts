import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UsersService {
	readonly collection = getFirestore().collection("users");

	async add(user: User) {
		await this.collection.add(user);
	}

	async update(id: string, user: User) {
		const docRef = this.collection.doc(id);
		if (!(await docRef.get()).exists) {
			throw new NotFoundError("Usuário não encontrado!");
		}
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
		await this.collection.doc(id).delete();
	}
}
