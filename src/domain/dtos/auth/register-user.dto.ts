import { Validators } from "../../../config";

export class RegisterUserDTO {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(body: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, email, password } = body;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new RegisterUserDTO(name, email, password)];
  }
}
