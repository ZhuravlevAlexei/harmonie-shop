import { InferSchemaType, model, Schema, models } from 'mongoose';
import { ROLES } from '@/shared/constants/common';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      default: ROLES.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export type UserType = InferSchemaType<typeof usersSchema>;
export const UsersCollection = models.users || model('users', usersSchema);
