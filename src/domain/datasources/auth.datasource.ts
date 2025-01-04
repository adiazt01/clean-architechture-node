import type { LoginUserDto } from "../dtos/auth/login-user.dto";
import type { RegisterUserDto } from "../dtos/auth/register-user.dto";
import type { UserEntity as User } from "../entities/user.entity";

export abstract class AuthDataSource {
	abstract login(loginUserDto: LoginUserDto): Promise<User>;
	abstract register(registerUserDto: RegisterUserDto): Promise<User>;
	abstract logout(): Promise<void>;
	abstract getUser(): Promise<User>;
}
