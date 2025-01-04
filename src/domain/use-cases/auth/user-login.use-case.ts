import type { JwtService } from "../../../infrastructure/services/jwt.service";
import type { LoginUserDto } from "../../dtos/auth/login-user.dto";
import type { UserToken } from "../../interfaces/auth.interfaces";
import type { AuthRepository } from "../../repositories/auth.repository";

interface UserLoginUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class UserLogin implements UserLoginUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const token = this.jwtService.genereToken({
            id: user.id,
        });

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}