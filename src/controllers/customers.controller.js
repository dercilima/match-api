import { customerModel } from "../models/customer.schema.js";
import { NotFoundError } from "../errors/not-found.error.js";

class CustomerController {
	static async getCustomers(req, res, next) {
		try {
			const customers = await customerModel.find({});
			res.status(200).json(customers);
		} catch (err) {
			next(err);
		}
	}

	static async getCustomerById(req, res, next) {
		try {
			const customerId = req.params.id;
			const customer = await customerModel.findById(customerId);
			if (customer) {
				res.status(200).send(customer);
			} else {
				throw new NotFoundError("Cliente não encontrado!");
			}
		} catch (err) {
			next(err);
		}
	}

	static async addCustomer(req, res, next) {
		try {
			await customerModel.create(req.body);
			res.status(200).json({
				message: "Cliente cadastrado com sucesso!",
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateCustomer(req, res, next) {
		try {
			const customerId = req.params.id;
			const customer = await customerModel.findByIdAndUpdate(customerId, req.body);
			if (customer) {
				res.status(200).json({
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

export default CustomerController;
