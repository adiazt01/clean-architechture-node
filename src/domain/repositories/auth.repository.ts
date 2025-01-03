import type { RegisterUserDto } from "../dtos/auth/register-user.dto";
import type { UserEntity as User } from "../entities/user.entity";

export abstract class AuthRepository {
	abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
