import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
	{
		id: { type: Types.ObjectId },
		nome: { type: String, required: true },
		email: { type: String, required: true },
	},
	{ versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;