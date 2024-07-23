import userModel from "../models/user.schema.js";

class UserController {
	static async getUsers(req, res) {
		try {
			const users = await userModel.find({});
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json({
				message: `Falha na requisição: ${err.message}`,
			});
		}
	}

	static async getUserById(req, res) {
		try {
			const userId = req.params.id;
			const user = await userModel.findById(userId);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).send("Usuário não encontrado!");
			}
		} catch (err) {
			res.status(500).json({
				message: `Falha na requisição: ${err.message}`,
			});
		}
	}

	static async addUser(req, res) {
		try {
			// Adiciona o usuário no array
			const user = await userModel.create(req.body);
			// Devolver a resposta para o cliente
			res.status(201).json({
				message: "Usuário criado com sucesso!",
				user: user,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: `Falha ao cadastrar usuário: ${err.message}`,
			});
		}
	}

	static async updateUser(req, res) {
		try {
			let id = req.params.id;
			await userModel.findByIdAndUpdate(id, req.body);
			res.status(200).json({
				message: "Usuário atualizado com sucesso!",
			});
		} catch (err) {
			res.status(500).json({
				message: `Falha na atualização: ${err.message}`,
			});
		}
	}

	static async deleteUser(req, res) {
		try {
			const id = req.params.id;
			await userModel.findByIdAndDelete(id);
			res.status(200).json({
				message: "Usuário excluído com sucesso!",
			});
		} catch (err) {
			res.status(500).json({
				message: `Falha na exclusão: ${err.message}`,
			});
		}
	}

	static async getUserByEmail(req, res) {
		try {
			const email = req.query.email;
			const users = await userModel.find({ email: email });
            res.status(200).json(users);
		} catch (err) {
			res.status(500).json({
				message: `Falha na requisição: ${err.message}`,
			});
		}
	}
}

export default UserController;
