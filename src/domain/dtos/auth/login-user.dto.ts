import { Validators } from "../../../config";

export class LoginUserDTO {
  private constructor(public email: string, public password: string) {}

  static login(body: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password } = body;

    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];

    return [undefined, new LoginUserDTO(email, password)];
  }
}
