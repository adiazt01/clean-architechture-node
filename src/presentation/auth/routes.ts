import { Response, Request, Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { db } from "../../data/sqlite";
import { EncriptationService, envs } from "../../config";
import { JwtService } from "../../infrastructure/services/jwt.service";
import { AuthGuard } from "../guards/auth.guard";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const encriptationService = new EncriptationService();
        const datasource = new AuthDatasourceImpl(db, encriptationService);
        const authRepository = new AuthRepositoryImpl(datasource);
        const jwtService = new JwtService(envs.JWT_SECRET, envs.JWT_EXPIRES_IN);
        const controller = new AuthController(authRepository, jwtService);
        const guard = new AuthGuard(jwtService);

        // Declare all routes here
        router.post('/login', (req, res, next) => controller.login(req, res, next));
        router.post('/register', (req, res, next) => controller.register(req, res, next));
        router.get('/me', guard.authenticate.bind(guard), (req: Request, res: Response): void => {
            // @ts-ignore
            res.json(req.user);
        });

        return router;
    }
}