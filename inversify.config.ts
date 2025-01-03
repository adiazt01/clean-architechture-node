import { Container } from 'inversify';
import { AuthRepository } from './src/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './src/infrastructure/repositories/auth.repository.impl';
import { AuthDataSource } from './src/domain/datasources/auth.datasource';
import { AuthDatasourceImpl } from './src/infrastructure/datasources/auth.datasource.impl';
import { EncriptationService } from './src/infrastructure/services/encriptation.service';
import { JwtService } from './src/infrastructure/services/jwt.service';
import { LoggerService } from './src/infrastructure/services/logger.service';
import { TYPES } from './types';
import { db, IDatabaseOrm } from './src/data/sqlite';
import { envs } from './src/config';
import { AuthController } from './src/api/v1/controller/controller';

const container = new Container();

// Other bindings
container.bind<IDatabaseOrm>(TYPES.Database).toConstantValue(db);

// Repositories
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl);

// Datasources
container.bind<AuthDataSource>(TYPES.AuthDataSource).to(AuthDatasourceImpl);

// Services
container.bind<EncriptationService>(TYPES.EncriptationService).to(EncriptationService);
container.bind<JwtService>(TYPES.JwtService).toDynamicValue(() => new JwtService(envs.JWT_SECRET!, envs.JWT_EXPIRES_IN!));
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);

// Controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };