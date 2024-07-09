import { JwtAdapter } from "../../../config";
import { RegisterUserDTO } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../rapositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignTokenFunction = (
  payload: Object,
  duration?: string
) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDTO): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFunction = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDTO): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken({ id: user.id }, "2h");

    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
