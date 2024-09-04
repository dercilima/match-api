import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";
import { getFirestore } from "firebase-admin/firestore";

export class CustomerController {
	static async getCustomers(req: Request, res: Response, next: NextFunction) {
		try {
			const snapshot = await getFirestore().collection("customers").get();
			const customers = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			res.status(200).send(customers);
		} catch (err) {
			next(err);
		}
	}

	static async getCustomerById(req: Request, res: Response, next: NextFunction) {
		try {
			const customerId = req.params.id;
			const snapshot = await getFirestore().collection("customers").doc(customerId).get();
			if (snapshot.exists) {
				res.status(200).send({
					id: snapshot.id,
					...snapshot.data(),
				});
			} else {
				throw new NotFoundError("Cliente não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async addCustomer(req: Request, res: Response, next: NextFunction) {
		try {
			await getFirestore().collection("customers").add(req.body);
			res.status(200).send({
				message: "Cliente cadastrado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateCustomer(req: Request, res: Response, next: NextFunction) {
		try {
			const customerId = req.params.id;
			const customer = await getFirestore()
				.collection("customers")
				.doc(customerId)
				.update(req.body);
			if (customer) {
				res.status(200).send({
					message: `Cliente alterado com sucesso!`,
				});
			} else {
				throw new NotFoundError("Cliente não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}
}
