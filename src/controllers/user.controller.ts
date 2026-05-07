import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userService = new UserService();

    const user = await userService.create({ name, email, password });

    return res.status(201).json(user);
  }
}
