import type { usersTable } from "../../data/sqlite/models/user.schema";
import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
	static userEntityToObject(
		object: typeof usersTable.$inferInsert,
	): UserEntity | null {
		const { email, name, rol, id } = object;

		if (!email || !name || !rol || !id) {
			throw CustomError.internalServerError();
		}

		return new UserEntity(id, name, email, [rol]);
	}
}
