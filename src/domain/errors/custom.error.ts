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

	static unauthorized(message = "Unauthorized"): CustomError {
		return new CustomError(message, 401);
	}

	static internalServerError(message = "Internal server error"): CustomError {
		return new CustomError(message, 500);
	}

	static badDatabaseConnection(
		message = "Bad database connection",
	): CustomError {
		return new CustomError(message, 500);
	}

	static conflict(message: string): CustomError {
		return new CustomError(message, 409);
	}
}
