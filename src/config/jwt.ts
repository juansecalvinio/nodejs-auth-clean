import jwt from "jsonwebtoken";
import { environments } from "./environments";

const JWT_SEED = environments.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);
        return resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
