import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import { AuthService } from "../services/auth.service";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Token not provided");
  }

  const token = authorization.split(" ")[1];

  const authService = new AuthService();

  const user = await authService.getLoggedUser(token);

  req.user = user;

  next();
}
