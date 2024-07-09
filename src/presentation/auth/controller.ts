import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  LoginUserDTO,
  RegisterUserDTO,
} from "../../domain";
import { UserModel } from "../../data/mongodb";
import { LoginUser, RegisterUser } from "../../domain/use-cases";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDTO] = RegisterUserDTO.create(req.body);

    if (error) res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDTO!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDTO.login(req.body);

    if (error) res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDTO!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ user: req.body.user }))
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
}
