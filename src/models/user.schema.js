import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
	{
		id: { type: Types.ObjectId },
		nome: { type: String, required: [true, "Nome é obrigatório"] },
		email: { type: String, required: [true, "E-mail é obrigatório"] },
	},
	{ versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;