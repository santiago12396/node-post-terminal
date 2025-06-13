import { NextFunction, Request, Response } from 'express';
import { JwtAdapter, TokenPayload } from '@/adapters';
import { User } from '@/models';
import { CustomError, handleError } from '@/errors';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization');

  try {
    if (!authorization) throw CustomError.badRequest('Token inválido');
    if (!authorization.startsWith('Bearer ')) throw CustomError.badRequest('Token inválido');

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) throw CustomError.badRequest('Token inválido');

    const payload = await JwtAdapter.validateToken<TokenPayload>(token);
    if (!payload) throw CustomError.badRequest('Token inválido');

    const user = await User.findById(payload.id);
    if (!user) throw CustomError.badRequest('Token inválido');

    next();
  } catch (error) {
    handleError(error, res);
  }
};
