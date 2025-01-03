import { Router } from "express";
import { AuthRoutes } from "./routes/routes";

export class userRoutesV1 {
	static get routes(): Router {
		const router = Router();

		// Declare all routes here
		router.use(
			"/auth",
			AuthRoutes.routes,
		);

		return router;
	}
}
