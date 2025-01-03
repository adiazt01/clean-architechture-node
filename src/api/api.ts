import { Router } from "express";
import { userRoutesV1 } from "./v1/v1";

export class ApiRoutes {
	static get routes(): Router {
		const router = Router();
		router.use("/api/v1", userRoutesV1.routes);
		return router;
	}
}
