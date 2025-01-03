import { Request, Response } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain"

export class AuthController {
    constructor (
        private readonly authRepository: AuthRepository,
    ) {} 

    public register(req: Request, res: Response): void {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) {
            res.status(400).json({ error: error })
        }

        this.authRepository.register(registerUserDto!)

        res.json('register')
    }

    public login(req: Request, res: Response) {
        res.json('waos')
    }
}