import express from "express";
import users from "./users.route.js";
import customers from "./customer.route.js";

const routes = (app) => {
	app.use(
		express.json(),
		users,
		customers
	);
};

export default routes;