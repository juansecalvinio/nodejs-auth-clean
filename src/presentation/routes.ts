import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  // Es estático para evitar crear instancias
  static get routes(): Router {
    const router = Router();

    // Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
