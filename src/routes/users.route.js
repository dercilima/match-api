import express from "express";
import UserController from "../controllers/users.controller.js";

const userRoutes = express.Router();

userRoutes.get("/users", UserController.getUsers);
userRoutes.get("/users/:id", UserController.getUserById);
userRoutes.post("/users", UserController.addUser);
userRoutes.put("/users/:id", UserController.updateUser);
userRoutes.delete("/users/:id", UserController.deleteUser);

export default userRoutes;