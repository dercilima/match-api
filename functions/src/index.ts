import { initializeApp as initializeFireApp } from "firebase/app";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";
import { app } from "./app";

initializeAdminApp();
initializeFireApp({
	apiKey: process.env.API_KEY,
});

export const api = onRequest(app);