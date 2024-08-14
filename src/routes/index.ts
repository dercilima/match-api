import express from "express";
import { userRoutes } from "./users.route";
import { customerRoutes } from "./customer.route";

export const routes = (app: express.Express) => {
	app.use(express.json(), userRoutes, customerRoutes);
};
