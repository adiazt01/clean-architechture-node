import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../domain";
import type { JwtService } from "../../../infrastructure/services/jwt.service";

export class AuthGuard {
	private jwtService: JwtService;

	constructor(jwtService: JwtService) {
		this.jwtService = jwtService;
	}

	public authenticate(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			throw CustomError.unauthorized("Token not provided");
		}

		try {
			const payload = this.jwtService.verifyToken(token);
			// @ts-ignore
			req.user = payload;
			next();
		} catch (error) {
			next(error);
		}
	}
}
