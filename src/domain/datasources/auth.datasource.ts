import { LoginUserDTO } from "../dtos/auth/login-user.dto";
import { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// Es abstract es porque no queremos crear instancias
export abstract class AuthDataSource {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
  abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
}
