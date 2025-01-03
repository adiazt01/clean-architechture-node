import { JwtService } from "../../../infrastructure/services/jwt.service";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
	token: string;
	user: {
		id: number | string;
		name: string;
		email: string;
	};
}

interface RegisterUserUseCase {
	execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class UserRegister implements RegisterUserUseCase {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtService: JwtService,
	) {}

	async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
		const newUser = await this.authRepository.register(registerUserDto!);

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
