import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { UsersService } from "../services/users.service";

export class UserController {
	static async getUsers(req: Request, res: Response) {
		const users = await new UsersService().findAll();
		res.status(200).send(users);
	}

	static async getUserById(req: Request, res: Response) {
		const userId = req.params.id;
		const user = await new UsersService().findById(userId);
		res.status(200).send(user);
	}

	static async addUser(req: Request, res: Response) {
		await new UsersService().add(req.body);
		res.status(201).send({
			message: "Usuário criado com sucesso!",
		});
	}

	static async updateUser(req: Request, res: Response) {
		const id = req.params.id;
		await new UsersService().update(id, req.body);
		res.status(200).send({
			message: "Usuário atualizado com sucesso!",
		});
	}

	static async deleteUser(req: Request, res: Response) {
		const id = req.params.id;
		await new UsersService().delete(id);
		res.status(200).send({
			message: "Usuário excluído com sucesso!",
		});
	}

	static async getUserByEmail(req: Request, res: Response) {
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
	}
}
