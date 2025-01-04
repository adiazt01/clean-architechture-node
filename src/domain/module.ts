import { ContainerModule, type interfaces } from "inversify";
import { UserRegister 
  
} from "./use-cases/auth/user-register.use-case";
import { UserLogin } from "./use-cases/auth/user-login.use-case";
import { TYPES_USE_CASE } from "./types";

export const useCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRegister>(TYPES_USE_CASE.UserRegister).to(UserRegister);
  bind<UserLogin>(TYPES_USE_CASE.UserLogin).to(UserLogin);
})