import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import type {
	AuthDataSource,
	AuthRepository,
	RegisterUserDto,
	UserEntity,
} from "../../domain";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
	private authDatasource: AuthDataSource;

	constructor(
		@inject(TYPES.AuthDataSource)
		authDatasource: AuthDataSource,
	) {
		this.authDatasource = authDatasource;
	}

	async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		return this.authDatasource.register(registerUserDto);
	}
}
