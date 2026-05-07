import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userExists = await userRepository.findOneBy({ email });

    if (!name || !email || !password) {
      throw new BadRequestError(
        "Missing required fields: name, email, password",
      );
    }

    if (userExists) {
      throw new BadRequestError("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }
} 
