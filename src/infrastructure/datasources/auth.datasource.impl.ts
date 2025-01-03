import { Encriptation } from "../../config";
import { IDatabaseOrm, db } from "../../data/sqlite";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LibSQLDatabase } from 'drizzle-orm/libsql';

export class AuthDatasourceImpl implements AuthDataSource {
    private db: IDatabaseOrm;
    private encriptation: Encriptation;

    constructor(db: IDatabaseOrm, encriptation: Encriptation) {
        this.db = db;
        this.encriptation = encriptation;
    }

    login(email: string, password: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { email, name, password } = registerUserDto;

        try {
            // Verificar si el correo existe
            // Hash de la contraseña
            // Mappear a la entidad
            return Promise.resolve(new UserEntity('1', email, name, password, ['ADMIN_ROLE']));
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