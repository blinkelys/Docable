import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

  },
  {
    timestamps: true,
  },
);

// Let Mongoose infer the type automatically
export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>("User", userSchema);
export default UserModel;