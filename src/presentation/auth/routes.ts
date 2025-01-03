import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { db } from "../../data/sqlite";
import { Encriptation } from "../../config";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl(db, Encriptation);
        const authRepository = new AuthRepositoryImpl(datasource);
        
        const controller = new AuthController(authRepository)

        // Declare all routes here
        router.post('/login', controller.login);
        router.post('/register', controller.register);

        return router;
    }
}