import mongoose, { Types } from "mongoose";

const customerSchema = new mongoose.Schema(
	{
		id: { type: Types.ObjectId },
		nome: { type: String, required: [true, "Nome é obrigatório"] },
		email: { type: String, required: [true, "E-mail é obrigatório"] },
		telefone: { type: String, required: [true, "Telefone é obrigatório"] },
	},
	{ versionKey: false }
);

const customerModel = mongoose.model("customers", customerSchema);

export { customerSchema, customerModel };
