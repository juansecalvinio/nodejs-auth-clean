import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  LoginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImplementation implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      // 1. Verificar que existe el correo
      const isEmail = await UserModel.findOne({ email });
      if (isEmail) throw CustomError.badRequest("User already exists");

      // 2. Hash de contraseña
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      await user.save();

      // 3. Mappear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer;
    }
  }
}
