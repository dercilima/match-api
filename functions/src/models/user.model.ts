import { Joi } from "celebrate";

export interface User {
	id: string;
	nome: string;
	email: string;
	password?: string;
}

export const newUserSchema = Joi.object().keys({
	nome: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});
