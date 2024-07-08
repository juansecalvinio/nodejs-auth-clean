import {
  AuthDataSource,
  AuthRepository,
  LoginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImplementation implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    return this.authDataSource.login(loginUserDTO);
  }
  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDTO);
  }
}
