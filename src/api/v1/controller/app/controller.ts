import { Application, NextFunction, Request, Response } from "express";
import {
	AuthRepository,
	CustomError,
	RegisterUserDto,
} from "../../../../domain";
import { JwtService } from "../../../../infrastructure/services/jwt.service";
import { UserRegister } from "../../../../domain/use-cases/auth/user-register.use-case";
import { LoggerService } from "../../../../infrastructure/services/logger.service";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../../../../types";
import { AuthRepositoryImpl } from "../../../../infrastructure";

@injectable()
export class AuthController {
	private authRepository: AuthRepository;
	private jwtService: JwtService;
	private logger: LoggerService;

	constructor(
		@inject(TYPES.AuthDataSource)
		authRepository: AuthRepositoryImpl,
		@inject(TYPES.JwtService)
		jwtService: JwtService,
		@inject(TYPES.LoggerService)
		logger: LoggerService,
	) {
		this.authRepository = authRepository;
		this.jwtService = jwtService;
		this.logger = logger;
	}

	public async register(req: Request, res: Response, next: NextFunction) {
		try {
			const [error, registerUserDto] = RegisterUserDto.create(req.body);

			if (error) {
				throw CustomError.badRequest("Invalid data");
			}

			const newUser = await new UserRegister(
				this.authRepository,
				this.jwtService,
			).execute(registerUserDto!);
			this.logger.info(`User ${newUser.user.email} has been created`);

			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		res.json("waos");
	}
}
