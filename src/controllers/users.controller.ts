import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";
import { getFirestore } from "firebase-admin/firestore";

export class UserController {
	static async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const usersSnapshot = await getFirestore().collection("users").get();
			const users = usersSnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			res.status(200).send(users);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.params.id;
			const userSnapshot = await getFirestore().collection("users").doc(userId).get();
			if (userSnapshot.exists) {
				res.status(200).send({
					id: userSnapshot.id,
					...userSnapshot.data(),
				});
			} else {
				throw new NotFoundError("Usuário não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async addUser(req: Request, res: Response, next: NextFunction) {
		try {
			await getFirestore().collection("users").add(req.body);
			res.status(201).send({
				message: "Usuário criado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const user = await getFirestore().collection("users").doc(id).update(req.body);
			if (user) {
				res.status(200).send({
					message: "Usuário atualizado com sucesso!",
				});
			} else {
				throw new NotFoundError("Usuário não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const user = await getFirestore().collection("users").doc(id).delete();
			if (user) {
				res.status(200).send({
					message: "Usuário excluído com sucesso!",
				});
			} else {
				throw new NotFoundError("Usuário não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const email = req.query.email;
			const usersSnapshot = await getFirestore()
				.collection("users")
				.where("email", "==", email)
				.get();
			const users = usersSnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			res.status(200).send(users);
		} catch (err) {
			next(err);
		}
	}
}
