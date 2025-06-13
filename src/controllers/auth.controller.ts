import { Request, Response } from 'express';
import { PostgresConfig } from '@/database';
import { BcryptAdapter, JwtAdapter } from '@/adapters';
import { CustomError, handleError } from '@/errors';
import { LoginType, SignupType } from '@/schemas';
import { UserModel } from '@/models';
import { UserEntity } from '@/entities';

export class AuthController {
  static signup = async (req: Request<unknown, unknown, SignupType>, res: Response) => {
    const { name, email, password } = req.body;

    try {
      const existUser = await UserModel.findOne({ email });
      if (existUser) throw CustomError.badRequest('El correo ya existe');

      const hashedPassword = BcryptAdapter.hash(password);

      const mongoUser = new UserModel({ name, email, password: hashedPassword });

      const userRepository = PostgresConfig.getDataSource().getRepository(UserEntity);
      const postgresUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await Promise.all([mongoUser.save(), userRepository.save(postgresUser)]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: rawPassword, ...userModel } = mongoUser.toObject();

      res.status(201).json({
        message: 'Usuario creado con éxito',
        user: userModel,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  static login = async (req: Request<unknown, unknown, LoginType>, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email }).select('+password');
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
