import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-erros";

interface LoginDTO {
  email: string;
  password: string;
}

type JwtPayLoad = {
  id: number;
};

export class AuthService {
  async login({ email, password }: LoginDTO) {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundError("Credentials invalid");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError("Credentials invalid");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogged } = user;

    return { user: userLogged, token };
  }
  async getLoggedUser(token: string) {

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayLoad;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const { password: _, ...userLogged } = user;

    return userLogged;
  }
}
