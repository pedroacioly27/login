import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const routes = Router();
routes.post("/login", new AuthController().login);

routes.get("/profile", authMiddleware, new AuthController().getLoggedUser);

export default routes;
