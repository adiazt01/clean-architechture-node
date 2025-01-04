import { inject } from "inversify";
import type { JwtService } from "../../../infrastructure/services/jwt.service";
import type { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import type { UserToken } from "../../interfaces/auth.interfaces";
import type { AuthRepository } from "../../repositories/auth.repository";
import { TYPES } from "../../../../types";
import { injectable } from "inversify";

interface RegisterUserUseCase {
	execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

@injectable()
export class UserRegister implements RegisterUserUseCase {
	constructor(
		@inject(TYPES.AuthRepository) private readonly authRepository: AuthRepository,
		@inject(TYPES.JwtService) private readonly jwtService: JwtService,
	) {}

	async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
		const newUser = await this.authRepository.register(registerUserDto);

		const token = this.jwtService.genereToken({
			id: newUser.id,
		});

		return {
			token: token,
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
			},
		};
	}
}
