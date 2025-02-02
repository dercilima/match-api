import * as express from "express";
import { UserController } from "../controllers/users.controller";

export const userRoutes = express.Router();

userRoutes.get("/users", UserController.getUsers);
userRoutes.get("/users/search", UserController.getUserByEmail); // Precedência de rotas do Express
userRoutes.get("/users/:id", UserController.getUserById);
userRoutes.post("/users", UserController.addUser);
userRoutes.put("/users/:id", UserController.updateUser);
userRoutes.delete("/users/:id", UserController.deleteUser);
