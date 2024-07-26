import { NotFoundError } from "../errors/not-found.error.js";
import userModel from "../models/user.schema.js";

class UserController {
	static async getUsers(req, res, next) {
		try {
			const users = await userModel.find({});
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}

	static async getUserById(req, res, next) {
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

	static async addUser(req, res, next) {
		try {
			await userModel.create(req.body);
			res.status(201).json({
				message: "Usuário criado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateUser(req, res, next) {
		try {
			let id = req.params.id;
			let user = await userModel.findByIdAndUpdate(id, req.body);
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

	static async deleteUser(req, res, next) {
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

	static async getUserByEmail(req, res, next) {
		try {
			const email = req.query.email;
			const users = await userModel.find({ email: email });
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}
}

export default UserController;
