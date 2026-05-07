import bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  async create({ name, email, password }: CreateUserDTO) {
    if (!name || !email || !password) {
      throw new BadRequestError(
        "Missing required fields: name, email, password",
      );
    }

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return user;
  }
}
