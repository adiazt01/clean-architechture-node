import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/jwt.service";
import { CustomError } from "../../domain";

export class AuthGuard {
    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public authenticate(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw CustomError.unauthorized('Token not provided');
        }

        try {
            const payload = this.jwtService.verifyToken(token);
            // @ts-ignore
            req.user = payload;
            next();
        } catch (error) {
            next(error)
        }
    }
}