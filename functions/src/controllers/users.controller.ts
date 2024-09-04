import { Request, Response, NextFunction } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { UsersService } from "../services/users.service";

export class UserController {
	static async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await new UsersService().findAll();
			res.status(200).send(users);
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.params.id;
			const user = await new UsersService().findById(userId);
			res.status(200).send(user);
		} catch (err) {
			next(err);
		}
	}

	static async addUser(req: Request, res: Response, next: NextFunction) {
		try {
			await new UsersService().add(req.body);
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
			await new UsersService().update(id, req.body);
			res.status(200).send({
				message: "Usuário atualizado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			await new UsersService().delete(id);
			res.status(200).send({
				message: "Usuário excluído com sucesso!",
			});
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
