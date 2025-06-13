import { Request, Response } from 'express';
import { BcryptAdapter, JwtAdapter } from '@/adapters';
import { CustomError, handleError } from '@/errors';
import { LoginType, SignupType } from '@/schemas';
import { User } from '@/models';

export class AuthController {
  static signup = async (req: Request<unknown, unknown, SignupType>, res: Response) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) throw CustomError.badRequest('El correo ya existe');

    try {
      const user = new User({ name, email, password });

      user.password = BcryptAdapter.hash(password);

      await user.save();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: rawPassword, ...userEntity } = user.toObject();

      res.status(201).json({
        message: 'Usuario creado con éxito',
        user: userEntity,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  static login = async (req: Request<unknown, unknown, LoginType>, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) throw CustomError.badRequest('El correo o contraseña no es valido');

      const validPassword = BcryptAdapter.compare(password, user.password!);
      if (!validPassword) throw CustomError.badRequest('El correo o contraseña no es valido');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: rawPassword, ...userEntity } = user.toObject();

      const token = await JwtAdapter.generateToken({ id: userEntity._id.toString() });

      res.json({
        token,
        user: userEntity,
      });
    } catch (error) {
      handleError(error, res);
    }
  };
}
