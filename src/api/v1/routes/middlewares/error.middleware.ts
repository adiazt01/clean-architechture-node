import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../domain/errors/custom.error";
import { inject } from "inversify";
import { TYPES } from "../../../../../types";
import type { LoggerService } from "../../../../infrastructure/services/logger.service";

export class ErrorHandler {

	static handle(
		err: CustomError | Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) {
	
		const statusCode = err instanceof CustomError ? err.statusCode : 500;
		const message = err.message || "Internal Server Error";
		
		const response = {
			error: {
				message,
				statusCode,
			},
		};

		res.status(statusCode).json(response);
	}
}
