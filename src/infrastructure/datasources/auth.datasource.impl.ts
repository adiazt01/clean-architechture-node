import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import type { IDatabaseOrm } from "../../data/sqlite";
import { usersTable } from "../../data/sqlite/models/user.schema";
import {
	type AuthDataSource,
	CustomError,
	type RegisterUserDto,
	type UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import type { EncriptationService } from "../services/encriptation.service";

@injectable()
export class AuthDatasourceImpl implements AuthDataSource {
	private db: IDatabaseOrm;
	private encriptation: EncriptationService;

	constructor(
		@inject(TYPES.Database)
		db: IDatabaseOrm,
		@inject(TYPES.EncriptationService)
		encriptation: EncriptationService,
	) {
		this.db = db;
		this.encriptation = encriptation;
	}

	login(email: string, password: string): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}

	async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		const { email, name, password } = registerUserDto;

		try {
			const userFound = await this.db
				.select()
				.from(usersTable)
				.where(eq(usersTable.email, email));

			if (userFound.length > 0) {
				throw CustomError.badRequest("Invalid email or password");
			}

			const hashedPassword = await this.encriptation.hash(password);

			const newUser = await this.db
				.insert(usersTable)
				.values({
					password: hashedPassword,
					rol: "admin",
					email,
					name,
				})
				.returning();

			if (!newUser[0]) {
				throw CustomError.internalServerError();
			}

			const userEntity = UserMapper.userEntityToObject(newUser[0]);

			if (!userEntity) {
				throw CustomError.internalServerError();
			}

			return userEntity;
		} catch (error) {
			if (error instanceof CustomError) {
				throw error;
			}

			throw CustomError.internalServerError();
		}
	}

	logout(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getUser(): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
}
