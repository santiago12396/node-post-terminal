import bcryptjs from 'bcryptjs';
import { CustomError } from '@/errors/custom-error';
import { User } from '@/models';
import { SignupType } from '@/schemas';
import { Request, Response } from 'express';

export class AuthController {
  static signup = async (req: Request<unknown, unknown, SignupType>, res: Response) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) throw CustomError.badRequest('El correo ya existe');

    try {
      const user = new User({ name, email, password });

      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);

      await user.save();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: rawPassword, ...userEntity } = user.toObject();

      res.status(201).json({
        message: 'Usuario creado con éxito',
        data: userEntity,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static login = async (req: Request<unknown, unknown, unknown>, res: Response) => {
    try {
      res.json({ message: 'holaaa' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
