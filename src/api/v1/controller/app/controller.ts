import type { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../../../../types";
import {
	CustomError,
	RegisterUserDto,
} from "../../../../domain";
import type { UserRegister } from "../../../../domain/use-cases/auth/user-register.use-case";
import type { LoggerService } from "../../../../infrastructure/services/logger.service";
import { LoginUserDto } from "../../../../domain/dtos/auth/login-user.dto";
import type { UserLogin } from "../../../../domain/use-cases/auth/user-login.use-case";
import { TYPES_USE_CASE } from "../../../../domain/types";

@injectable()
export class AuthController {
	constructor(
		@inject(TYPES.LoggerService)
		private logger: LoggerService,
		@inject(TYPES_USE_CASE.UserRegister)
        private userRegister: UserRegister,
        @inject(TYPES_USE_CASE.UserLogin)
        private userLogin: UserLogin,
	) {
	}

	public async register(req: Request, res: Response, next: NextFunction) {
		try {
			const [error, registerUserDto] = RegisterUserDto.create(req.body);
			
			if (error || !registerUserDto) {
				throw CustomError.badRequest("Invalid data");
			}

			const newUser = await this.userRegister.execute(registerUserDto);

			this.logger.info(`User ${newUser.user.email} has been created`);

			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const [error, loginUserDto] = LoginUserDto.create(req.body);

			if (error || !loginUserDto) {
				throw CustomError.badRequest("Invalid data");
			}

			const user = await this.userLogin.execute(loginUserDto);

			this.logger.info(`User ${user.user.email} has been logged in`);

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
}
