import { Schema, model } from 'mongoose';
import { Role } from '@/interfaces';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es requerido'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [false, 'La contraseña es requerida'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: `El rol debe ser uno de: ${Object.values(Role).join(', ')}`,
      },
      default: Role.Admin,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model('User', userSchema);
