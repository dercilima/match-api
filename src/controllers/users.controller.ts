import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";
import userModel from "../models/user.schema";

export class UserController {
	static async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userModel.find({});
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}

	static async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.params.id;
			const user = await userModel.findById(userId);
			if (user) {
				res.status(200).json(user);
			} else {
				throw new NotFoundError("Usuário não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async addUser(req: Request, res: Response, next: NextFunction) {
		try {
			await userModel.create(req.body);
			res.status(201).json({
				message: "Usuário criado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const user = await userModel.findByIdAndUpdate(id, req.body);
			if (user) {
				res.status(200).json({
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
			const user = await userModel.findByIdAndDelete(id);
			if (user) {
				res.status(200).json({
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
			const users = await userModel.find({ email: email });
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}
}