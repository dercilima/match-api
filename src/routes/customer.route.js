import express from "express";
import CustomerController from "./../controllers/customers.controller.js";

const routes = express.Router();

routes.get("/customers", CustomerController.getCustomers);
routes.get("/customers/:id", CustomerController.getCustomerById);
routes.post("/customers", CustomerController.addCustomer);
routes.put("/customers/:id", CustomerController.updateCustomer);

export default routes;
