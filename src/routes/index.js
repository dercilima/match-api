import express from "express";
import userRoutes from "./users.route.js";

const routes = (app) => {
    app.use(express.json(), userRoutes);
};

export default routes;