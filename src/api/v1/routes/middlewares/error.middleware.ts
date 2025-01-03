import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../../domain/errors/custom.error";

export class ErrorHandler {
    static handle(err: CustomError | Error, req: Request, res: Response, next: NextFunction) {
        const statusCode = (err instanceof CustomError) ? err.statusCode : 500;
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