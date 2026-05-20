import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UnauthorizedError } from "../helpers/api-erros";

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const authService = new AuthService();

    const user = await authService.login({ email, password });

    res.status(200).json(user);
  }

  async getLoggedUser(req: Request, res: Response) {
    return res.json(req.user);
  }
}
