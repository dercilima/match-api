import * as express from "express";
import { UserController } from "../controllers/users.controller";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newUserSchema } from "../models/user.model";

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UserController.getUsers));
userRoutes.get("/users/search", asyncHandler(UserController.getUserByEmail));
userRoutes.get("/users/:id", asyncHandler(UserController.getUserById));
userRoutes.post(
	"/users",
	celebrate({
		[Segments.BODY]: newUserSchema,
	}),
	asyncHandler(UserController.addUser)
);
userRoutes.put("/users/:id", asyncHandler(UserController.updateUser));
userRoutes.delete("/users/:id", asyncHandler(UserController.deleteUser));
