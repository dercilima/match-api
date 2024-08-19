import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UsersService {
	collection = getFirestore().collection("users");

	async add(user: User) {
		await this.collection.add(user);
	}

	async update(id: string, user: User) {
		const result = await getFirestore()
			.collection("users")
			.doc(id)
			.update({ ...user });
		if (!result) {
			throw new NotFoundError("Usuário não encontrado!");
		}
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
}
