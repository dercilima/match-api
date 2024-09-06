import { Response } from "express";
import { Request } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const userCredential = await new AuthService().login(email, password);
		const token = await userCredential.user.getIdToken();
		res.send({
			token: token,
		});
	}
}
