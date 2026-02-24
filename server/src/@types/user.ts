import { Document } from "mongoose";

export default interface User extends Document {
  username: String;
  email: String;
  Password: String;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}