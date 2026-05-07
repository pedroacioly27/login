import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const routes = Router();
routes.post("/register", new UserController().create);

export default routes;