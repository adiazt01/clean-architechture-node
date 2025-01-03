import { UserEntity } from "../../domain";
import { usersTable } from "../../data/sqlite/models/user.schema";

export class UserMapper {
    static userEntityToObject(object: typeof usersTable.$inferInsert) {
        if (!object) {
            return null;
        }
        const { age, email, name, id } = object;
        return new UserEntity()
    }
}