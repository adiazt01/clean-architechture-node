import { NextFunction, Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain"
import { JwtService } from "../../infrastructure/services/jwt.service"
import { UserRegister } from "../../domain/use-cases/auth/user-register.use-case"

export class AuthController {
    private authRepository: AuthRepository
    private jwtService: JwtService

    constructor (
        authRepository: AuthRepository,
        jwtService: JwtService
    ) {
        this.authRepository = authRepository,
        this.jwtService = jwtService
    } 

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const [error, registerUserDto] = RegisterUserDto.create(req.body)
            
            if (error) {
                throw CustomError.badRequest('Invalid data')
            }
            
            const newUser = await new UserRegister(this.authRepository, this.jwtService).execute(registerUserDto!)

            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        res.json('waos')
    }
}