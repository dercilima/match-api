import * as express from "express";
import { CustomerController } from "./../controllers/customers.controller";

export const customerRoutes = express.Router();

customerRoutes.get("/customers", CustomerController.getCustomers);
customerRoutes.get("/customers/:id", CustomerController.getCustomerById);
customerRoutes.post("/customers", CustomerController.addCustomer);
customerRoutes.put("/customers/:id", CustomerController.updateCustomer);
