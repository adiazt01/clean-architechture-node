import { Container } from "inversify";
import { AuthController } from "./src/api/v1/controller/app/controller";
import { envs } from "./src/config";
import { type IDatabaseOrm, db } from "./src/data/sqlite";
import type { AuthDataSource } from "./src/domain/datasources/auth.datasource";
import type { AuthRepository } from "./src/domain/repositories/auth.repository";
import { AuthDatasourceImpl } from "./src/infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "./src/infrastructure/repositories/auth.repository.impl";
import { EncriptationService } from "./src/infrastructure/services/encriptation.service";
import { JwtService } from "./src/infrastructure/services/jwt.service";
import { LoggerService } from "./src/infrastructure/services/logger.service";
import { TYPES } from "./types";

const container = new Container();

// Other bindings
container.bind<IDatabaseOrm>(TYPES.Database).toConstantValue(db);

// Repositories
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);

// Datasources
container.bind<AuthDataSource>(TYPES.AuthDataSource).to(AuthDatasourceImpl);

// Services
container
	.bind<EncriptationService>(TYPES.EncriptationService)
	.to(EncriptationService);
container
	.bind<JwtService>(TYPES.JwtService)
	.toDynamicValue(() => new JwtService(envs.JWT_SECRET!, envs.JWT_EXPIRES_IN!));
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };
