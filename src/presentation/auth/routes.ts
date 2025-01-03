import { Router } from "express";
import { AuthController } from "./controller";
import { TYPES } from "../../../types";
import { container } from "../../../inversify.config";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = container.get<AuthController>(TYPES.AuthController);
        
        console.log(`controller`, controller);
        
        // Declare all routes here
        router.post('/login', (req, res, next) => controller.login(req, res, next));
        router.post('/register', (req, res, next) => controller.register(req, res, next));
        // router.get('/me', guard.authenticate.bind(guard), (req: Request, res: Response): void => {
        //     // @ts-ignore
        //     res.json(req.user);
        // });

        return router;
    }
}