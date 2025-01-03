import { NextFunction, Request, Response } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain"
import { JwtService } from "../../infrastructure/services/jwt.service"

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
                res.status(400).json({ error: error })
            }
            
            const newUser = await this.authRepository.register(registerUserDto!)

            const token = this.jwtService.genereToken({ id: newUser.id })
            
            res.json({
                user: newUser,
                token: token
            })
        } catch (error) {
            next(error)
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        res.json('waos')
    }
}