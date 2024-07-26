import express from "express";
import UserController from "../controllers/users.controller.js";

const routes = express.Router();

routes.get("/users", UserController.getUsers);
routes.get("/users/search", UserController.getUserByEmail); // Precedência de rotas do Express
routes.get("/users/:id", UserController.getUserById);
routes.post("/users", UserController.addUser);
routes.put("/users/:id", UserController.updateUser);
routes.delete("/users/:id", UserController.deleteUser);

export default routes;