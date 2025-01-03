export class CustomError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 400,
    ) {
        super(message);
        this.name = this.constructor.name;
    }

    static badRequest(message: string): CustomError {
        return new CustomError(message, 400);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(message, 401);
    }

    static internalServerError(message: string = "Internal server error"): CustomError {
        return new CustomError(message, 500);
    }

    static badDatabaseConnection(message: string = "Bad database connection"): CustomError {
        return new CustomError(message, 500);
    }
}