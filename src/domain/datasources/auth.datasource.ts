import { UserEntity as User } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthDataSource {
	abstract login(
		email: string,
		password: string,
	): Promise<User>;
	abstract register(
		registerUserDto: RegisterUserDto,
	): Promise<User>;
	abstract logout(): Promise<void>;
	abstract getUser(): Promise<User>;
}
