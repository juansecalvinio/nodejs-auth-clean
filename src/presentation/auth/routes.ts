import { Router } from "express";
import { AuthController } from "./controller";
import {
  AuthDataSourceImplementation,
  AuthRepositoryImplementation,
} from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDataSourceImplementation();
    const repository = new AuthRepositoryImplementation(datasource);
    const controller = new AuthController(repository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", AuthMiddleware.validateJwt, controller.getUsers);

    return router;
  }
}
