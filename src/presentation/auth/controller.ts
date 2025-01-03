import { NextFunction, Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain"
import { JwtService } from "../../infrastructure/services/jwt.service"
import { UserRegister } from "../../domain/use-cases/auth/user-register.use-case"
import { LoggerService } from "../../infrastructure/services/logger.service"

export class AuthController {
    private authRepository: AuthRepository
    private jwtService: JwtService
    private logger: LoggerService

    constructor (
        authRepository: AuthRepository,
        jwtService: JwtService,
        logger: LoggerService
    ) {
        this.authRepository = authRepository,
        this.jwtService = jwtService,
        this.logger = logger
    } 

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const [error, registerUserDto] = RegisterUserDto.create(req.body)
            
            if (error) {
                throw CustomError.badRequest('Invalid data')
            }
            
            const newUser = await new UserRegister(this.authRepository, this.jwtService).execute(registerUserDto!)
            this.logger.info(`User ${newUser.user.email} has been created`)

            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        res.json('waos')
    }
}