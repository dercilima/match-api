import asyncHandler from "express-async-handler";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { celebrate, Joi, Segments } from "celebrate";

export const authRoutes = Router();

authRoutes.post(
	"/auth/login",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		}),
	}),
	asyncHandler(AuthController.login)
);
