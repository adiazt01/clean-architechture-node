import { UserEntity as User } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthRepository {
	abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
