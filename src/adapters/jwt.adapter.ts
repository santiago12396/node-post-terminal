import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
}

export class JwtAdapter {
  static async generateToken(
    payload: TokenPayload,
    duration: SignOptions['expiresIn'] = '2h'
  ): Promise<string | null> {
    const options = { expiresIn: duration };
    return new Promise(resolve => {
      jwt.sign(payload, process.env.JWT_SEED, options, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise(resolve => {
      jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
